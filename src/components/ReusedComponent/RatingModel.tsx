"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { backend_url } from "../constant";

const validationSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

interface RatingProps {
  isOpen: boolean;
  onClose: () => void;
  approve: () => void;
  mentor: string;
}

const RatingModel = ({ isOpen, onClose, approve, mentor }: RatingProps) => {
  const isLogin = useSelector((state: RootState) => state.users.isLogin);
  const user = useSelector((state: RootState) => state.users.user);
  const token = user?.token;
  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isLogin && token) {
        const response = await axios.post(
          `${backend_url}/api/v1/comment/create`,
          { values, mentor },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Successfully commented");
        // console.log(response.data);
        onClose(); // Close the dialog
        approve(); // Approve the payment
        window.location.reload();
      } else {
        toast.error("You need to be logged in to submit a comment.");
      }
    },
  });

  const handleStarClick = (value: number) => {
    formik.setFieldValue("rating", value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="container bg-white dark:bg-gray-900 dark:text-white space-y-3">
          <p className="text-xl capitalize">Add your review for mentor</p>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block mb-1">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Add comment"
                rows={4}
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-300 outline-[#008B8B] rounded-lg shadow-sm"
              />
              {formik.touched.comment && formik.errors.comment && (
                <div className="text-red-500">{formik.errors.comment}</div>
              )}
            </div>
            <div className="form-group">
              <label className="block mb-1">Rating:</label>
              <div className="star-rating text-3xl">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`p-4 star cursor-pointer ${
                      formik.values.rating && value <= formik.values.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(value)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              {formik.touched.rating && formik.errors.rating && (
                <div className="text-red-500">{formik.errors.rating}</div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="button"
                className="bg-gray-200 px-5 py-2 rounded-lg text-gray-700 mr-4"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-white py-2 px-5 rounded-lg font-semibold"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModel;
