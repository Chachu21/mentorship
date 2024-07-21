import Image from "next/image";
import React from "react";

import {
  FaUserPlus,
  FaUserEdit,
  FaCalendarCheck,
  FaHandshake,
  FaArrowRight,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <div className="bg-white sm:max-w-4xl w-full">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">About Us</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Welcome to our mentorship system! we are dedicated to connecting
          mentors and mentees to foster growth, learning, and professional
          development. Our platform provides an easy and efficient way for
          individuals to find the right mentor or mentee and build meaningful
          relationships.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Our mission is to empower individuals by providing them with the
          guidance and support they need to succeed. Whether you are looking to
          advance your career, develop new skills, or seek advice on personal
          growth, our mentorship system is here to support you every step of the
          way.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Join us today and embark on your journey towards achieving your goals
          with the support of experienced mentors and a vibrant community of
          learners.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          If you have any questions or need assistance, please feel free to
          contact us. We are here to help you make the most out of your
          mentorship experience.
        </p>
      </div>
      <SuccessStory />
      <HowToFindWork />
    </main>
  );
};
const SuccessStory = () => {
  return (
    <div className="bg-white sm:max-w-4xl w-full">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
        Success Story
      </h2>
      <div className="flex flex-col md:flex-row items-center mb-6 p-1">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZIPpeVc3ElCNCN6Cpa29IRBd23HO8ntdSCQ&usqp=CAU"
          alt="Success Story"
          width={120}
          height={1000}
          className="w-full md:w-full mb-4 md:mb-0 md:mr-6 rounded-lg shadow-md"
        />
        <p className="text-gray-600 text-lg leading-relaxed">
          Meet Sarah, one of our mentees who achieved her career goals through
          our mentorship program. With the guidance of her mentor, Sarah
          successfully transitioned into a new role and developed skills that
          propelled her professional growth. Her story is a testament to the
          power of mentorship and the positive impact it can have on an
          individual`&apos;`s career.
        </p>
      </div>
    </div>
  );
};

const HowToFindWork = () => {
  return (
    <div className="bg-white sm:max-w-4xl w-full  mx-auto mt-10  rounded-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
        How to Find Work
      </h2>
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="w-full md:w-2/3 flex items-center justify-center">
          <Image
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUZGBgYGhwfGRwcGBwaIxwaHBgcHBgZGhocIS4lHh4rIRoYJjgmKy8xNTU1HCQ7QDs1Py40NTEBDAwMEA8QHxISHzQrJCw0NDQ3NDQ0NDQ0NDQ0NDU0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOYA2wMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EAD8QAAECAwYCBwYFAwQCAwAAAAEAAgMEEQUSITFBUWFxBiKRobHB0RMyQlKB8AdicuHxFCOCkqKywjPSJKPi/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EACYRAAICAgEEAwACAwAAAAAAAAABAhEDITESQVFxBAVhEzIigeH/2gAMAwEAAhEDEQA/APsyIiAIiIAiIgCIiAIiIAiLCAjxpljPecB97KDHtuG3Rx+lB3qotaY/uPccm17Gj+VWSE+2M0m6RQ0IOOi8HP8AZZVJqCSSdfp0xwxpNl+/pF8rR9T6Bb5O3WuIa4XScAa1FeOy42HjFLK4NqTy08QrMvY2gN0VwFaCp2FcyudfYZ4yTbv8ot/FFrg6+JOw25vb21PYFpFrwa0vdx9FyE11ReGmY81EZNVIG5A7Vu/tMr3GKoj+Bd2fRmPBFQQQciMV7XHyk0+GC1rjQ44gGh4bKonOkkS8QL1QSKlxzBp7oW6+1i4qotvv4KfwvyfSEXz+zLQmi5j3ROpUEtqes3bGvirWZ6U0JAugjQAuPbgFqvtMNbu/CIeGR1aLk7M6TPixmQ7raOJBONcATlWmi6xdmDPHNHqiZyi4umZREW5UIiIAiIgCIiAIiIAiIgCIiAIiIDhrad1o3+XgVQWQyM1tWtZddjVxpwwpj3K8ts/3Io4u8FVWVMVYG0IugDnWuS+Ty2py9s7o8IkQZa7Fc9zmlzhS4NB1ccTXQaaqt6RO6zOR8R6LbBP/AMh/6B4NUa3j1mcj4qkU1JX4JfBdzT/7b/0O/wCJVFZTy6K3YVJ+gw76K2mn/wBt/wCh3/EqqsAdZ7tgB2mvkEiqi2HydAI3WLdgD2kjyXPWiykR/OvaK+amsjVmHDZgHeD/ANlGtZvXB3aO4n9kiul/6D4LmRd/bZ+keCpJh/Xf+p3iVbSruoz9LfAKijv67v1HxUQW2GXPRY1m4XN3dDevpi+ZdD8ZuHwDj/scPNfTV7/1qrE/Zy5f7GURF6JkEREAREQBERAEREAREQBYKLl7dteLCilg926CKYHHPHmCpjHqdFZSpWdLEiACpIA4mihxbUhjIk8h5lcmLUa7F16u563fmt7JljsnDtp3FarEu7MpZX2Rotp16I54bQOpxxAp5KuvtFAABXvwqr0hazBZSl1tDwC8n5H0/XkcoypPdfptD5fTFKSOXZEpMO4in+0HyXu0JV0QtukCgNaldC2RhglwY2p1IqcqYVy+ijRbNPwOFNj6rkzfV54JShT80bx+VCTp6K2dfSG/9Dv+JUWxBSHX5nHuw8irWLY7ntuvfdBzuipI2BOXYVoMmYfVa11xtaHPCuZIXLP4efHitxe2aLNBypMw2E0OLrvXObqnspWmgUW1MQ07VHb/AAtclKzJN9wc1gqTfNKjOgBxWydxZyI9PNYTxZMcl1LkupxknRLgO6rf0jwVDEf1jzPiriG7Ach4LXK2fCrWI5xO1KDtGJ7lSLUbbLNWOjMQiOC00Ia7Ecqea7VtpRRrXmB5Ll49qQIIutbU/K0UH1J/dQpS2IkSNDbW60uFWjUZ4k4nuXrfX/NcaxuGm+f+HLnxP+yfY7xlsu1a08qj1W5lst1aRyIPoqYrS+YAyxX0TxxOBZJeTpm2pDOZI5g+SlQY7XAOaQQf4XDviE5ldfZLLsFg/LXtx81lOCjwaRm3yT0RFmbBERAEREARFgoCrt+bfChX2UreANRXA1y41ouUi2gyIaxWknKueG1cCBwVJ066ZRoUuRQe0e4NbgC1uZLrpzIphWuJGy+UyvSebY+97ZzscQ8lwPChy+lFqmo6MnFy2j7cJWE/3H04H0NCtb7OeMqO+tPFQbGd/Uy7I8OlHjFtcWuBo5uOdCDjrgVJvRGfM3w9FqYcA32fM3tp6Lay0XjOh5j0WYdpvGYDu79u5bf6iC/3mXeNPNuKEnplpj4mkcsfRSGTjD8QHPDxUX+hY73H+B7s1pfZzxlR3I+qnZGi3Brksrny17NHN7R3rayeePirzFe/NBRdEVwKixLOhuzZ2EjwK0MtP5m9h8ipDJ9h1pzCpPHCf9op+0TGUo8OiO+yW/C4jsPoo77KeMnNPaFbCK2lbwI4Gq1PmflHauOf1nxp9q9M1j8nIu5QiwHveXPcGN4Yk4dg+8FaS0tChf8AjZj8xxPb6UXpziczVYW2H4mLCv8AFb8vbInllLlnp8QnMryiLpMzBXey8O61rdgB2Ci4aAy89rd3Adpou9WOXsa4lyZREWRsEREAREQGFzdu2y+DEuU6paDUZ4kg58uCs7bnjAh32tB6wBroDXHtouYjzcOYNXu6wGvVIGfLdaQjezLJKlRzHTayGTkufY09s115rSbt7AhzccKkGo4gbr4xFgua4tc0tcDQtIIIOxBxBX0LpF01Yx7mSoEQA0L3+6TrcAPWH5jTkRiubPTSdvXmxGtIypDhmnIuaSO1JOLZME0j6B0MlY8tKta8OYXEuukZXqUBByNADTSq6WHah+JoPLDuXzexfxMmGOAmWtjMOZDWtcOIu0aeRAruF9Fs+clJtofBc0g506rgdnNOR+i0i01SMpxadtEi/AfmA0/6fDBeX2YDix/b6j0XiLZbh7rgeBwKilj2fM3w7RgVYp6PUSTe34SeIx8MVhk09uTjyOPit0K0njOju49ykidhvwe2nMV7xig2amWofiaDyw7itntID8xdPKneMF6MhDfix1ORvD1UWJZrxlR3d4qdjRvdZzXYsf4O7wtD7PeMgDyPqozmOYcQWn6jvUmWnH1AvVHHluo0NmJdhbWoIyzFN1vWSa5rCkkIiIAiIgJdlMvRmD81ezHyXarkejzaxgflaT3U811ywycm+LgyiIszQIiIDCwThhisqktC2wyIYWDXADF2RqK4fupSbdIrKSirZVR7abMNLHUaDSrThkajrc+S+Z/ibaIghstCcbz23on5WV6rajehrwHFd7N2YDVzXUzJBy3OOi+JyUF09Okurde4udwYMm4cLrRzC2lpdKMof5PqZHbYMX+mdNOF2GKBlRi8lwabvAY48FTr6X+Jlrt9hAlmNDADeIbgA1rbrGgbYnD8oXzRZSSTpG0W2rO96G9CYc7LPiPiOY++WsIukUDRUubmQXEjMe6qWck5qzI9CaE4tcMWxGg943GY4YFfQ+ilnPhyUAj4mX6g4i+S8YZ5EKbakFsxCMGO2+05HJzHaOY7Q861yNQtOnSrky631O+DT0e6Q+3hB7HEaPaTeuuGY5ag7K+hWqMnt+o9CuW6D9H2yjopfGa5rw0NaW0HVJIc4nAHEj6ldbFsxjsWG73j7+qvG62ZS6b0ZEODEypXh1T2fstEWyz8LgeBw71GjWe9ul4btx7s15hTr2YXq8Dj+4ViPR5fAezEtI4/uFuhWg9utRxx781Kg2qPjaRxGPct3soMTKleGB7PUJ6F+TXDtNpwe0jvCxEaytWsA45dwwWqYs27iH/Q+oXtBrsEREJCIiAIiIC66MM673bNA7T/APldMqHouzqvduQOwV/7K+XNk5OjHwZREVS4RFqixAxpc40DRUnYDMoCNaFoNggF3xGg0FaVoTouYtmX9u6/g110ADMEAkivHHPuU63ojZhgY3Cjg4E7gEZbUK5oRIsA0OLeOLTyOi2hGlbRzzlbpM1xhFhtcw1DXAjduIpht3Kh/D2xBKGK6O5l99GtpiAwGpq4j4jTD8o+nZy9osfgeqTo7I8jkV4mbKa7FnVO2n7K/TuyvVqj45+JMSs/EaAA1jWBtNjDa497iuUXSdP5dzJ2IHZkMP8A9bR5LpPwlaxpjxHgfA1jiK0PWLuXwLGrlRv1dMbOAElELS8Q33QKl100A3rSi7D8NbXuxxKxMYcWoZX4YlKtunS9QimpIX1mZkIcVpqBRwxIpQg51GRXxDpZYj5CautJu4PhOFcq4CvzNIp2HVS4uOyqkp6Ps0eyTmx1eB9VDrEhn4m+B8itFh9IHRYLImDg5oJBzDsnCvAgjFXkGfhvFDhXR2XbkttMwdrkjQbWPxtrxHopYfCi7E8cD6rXHsxjsW9U8MR2KBFs57cTiNxj3ZqdoaZLjWSPgdTgfUKBGlHszaeYxHaMl7hTz2Gl6oGjsf3U+HPl7ahtDzr2KNDaNEFxLQSa4a4r2iKSQiIgCIiAIiIDqujjKQa/M4nwHkrZQbGZdgsHCvaSfNTlyvk6Y8IyiIoLGFX2hNw7rmE3rzS0gY5gg10U2LEa0VcQBxXBWrGfCjPezrQ3uqK5VNC79JvV5q0I29lJypaIgdGl8Diztb9D8JVlLTzIgpkTm068tCvUrOMiigz1afvEKJN2QDizA/KcvodF0nN7PU1ZLTizqnY5fsobJqLBN1wJGzv+pXqBaL4ZuRASBvmOR1CtWx4cRhNQWgVdXQDUjTmoG0fG/wARIjYk45+IHs2VHGh9F2H4f2S10k14JBiPcRXZtGAf7D2r5paU46Ymnvhgn2kSkNuNaE3Ybc86UGe6+wWS98sxkEirWNAocDX4nA8TU65rKO5Nm09RSN5hxIJriOIxB56dqruksgyfhNZENx7HVZEa29SuDmubndNBkcwNl1EvNsiYA4/Kc/3WmYsxjsW9U93YtHG0ZJ07IVg2FBgS7ILXX7tavyJc4knLIY5Yr3HspwxYb3A4H0KjRIMSEa4jH3hl9fQqXLWto8fUeY9FKrgO+SLCjvhm6CR+U5dmn0VjAtVpweLvHMeoUoFkRujh4eYKhTFk6sP0d6+qnZFolRYUN4vGh/MDj2hQmQg2oaSRnitMvBexxDmkYfdCpKgkIsELKkBERAEREAWQCcAKk5BeoMJz3BrRUnT70XU2XZTYQqes/fQcB6qkpKJMYuROlWXWMbs1o7AAt6Iuc6jCIqnpHHfDgF7Di0gkZVaTRwrpnX6IlbIbpWVPSyYdDex7TeFC17dBQgtP5Saux4BRZWbZFGGerTn2ahJSbZFbVv8Ak05jmNlAnLKob8I3SMbtaf6TpyXVFdKOWT6mepyyfih4H5a0/wBJ0+8l4lrVcw3IoOGtMRzGvPxXqTtbG5FF1wwvUp/qGisJmVZEHWFdiMxyKn0R7D2MiNxo5pyPodCuJ/EBplpZ7mu/8h9mN+sCXg0zFwOH1V7El4subzDVu+n+TfNQeklnttGCyEX+ye14c0kXmnAtIzG/8qstr9Jhp/h89/DmVa6cbEeDcgguyr1zgyve7D5V9pcxkRuNHDQ+h0VDYHQ+FKwSwOLnuNXPpSppQANr7o2rXE44rY+FFgGoOG4xB5hRCPStlpyUno3TNkubiw3htr9N14lrSezqv6wG+BH19VNlLWa7B/VO+h+un1UuZlWPHWHIjPtV68FL8mJabY8dU46g59ijzNmMdi3qHhl2eir5mzXsxb1gNsx9PRepa1Xtwf1hvr+6X5FeDVFlnwzXEfmacO3T6qXJ2m8m64A7HLt3VjLzLHjqmu41+oUSYl2B15ooRnTLs9EoXfIe8nEleURCQiIgCIiAKRJyborrrRzOgHFbrNs10U191ozd5N3K6yWl2saGtFAO/idys5zrSLxh1bfBpkJBsIUGJOZOZ9BwUxEWDdm6VGUREJNMcm64tALqG6DkTTAH6rk4Vp/1AvXid2nC7wp5qzmbXLnPYzAtcWu3qPAEYhczPWc5rvawTR2ZbvvT0W0I1tmGSSekYnLMLTfgm64fCP8Ar6ZLZIWqH9R/VflsCfI8Fts+0WxOqeq8Zt33p6JaFnNiY+6/ffg7da+jL8ZsnZFkQY4O0cM/ruFVMiRZY3XC8zTb/E6Hh/K9y1oPguuRgSNDmQNwfiHf4K46j26Oa76gpyODzLTTIgq08wcxzChT1kNd1mUadtDy2Ueas17DfhE4aDMcvmHDxW+Qtdruq+jXb6Hnse5PY/URZe0HwjceCQNDmOR1CuYEdj21aQRqNuBCTEux4o4V2Oo5FUszIvhG+wkgajMfqG3cnA0yZOWQ12LOqdtDy2UGFMxIJukGnynL6H0U2StcOwf1T82h57eCsYsJrxRwDh94gp6IuuTRKT7H4A0d8p8t1makGPxIo7cee6rJuyXNxZ1htqPVeZW1Xswf1gN/eH11+qX5JrwYfIvY4HMVHWHPUaKatsWOXZYD7zWpCQiIgCIgCAK3sqxy+jn1DdBkXeg++Kk2TY1KPijHRu3F3HgugWM59kaxx92eIbA0UAAAyAWxEWRsEREAREQHKdIrFffMzLkl9BfZ8wApUDU0Aw1phjnAs+fbFGGDh7zduI3C7lcx0g6PF59vL9WKMSBgH+Qd3HXdaQnWmZTx3tFRaNmh/XZ1XjXKvPY8VpkLTIPs43VeMKnCvPY8cit9n2iH1Y8XIjcHNOGIzoD4aLbPSLIoxwcMnbcOI4Lf9Rh+M2zMs17brxUd4O4OipHsiSzqtN5hP0+vynj/AAtktOPgO9nGBLfhdnQcNxwzHcroFrm6OaRzBCcjg0yc4yIKtOOoOY/bitM/ZjX9YdV++h5jzUKdsxzDfgk4Y3RmP07jh4qRZ1rNfRr6NfodHeh4J+MfqIUCciQDceCW7cN2nbh4K8lphrxeYajvHAjRYmIDXi68VHhxB0VJMyb4BvsJLRqMxwcNk4GmWE7ZTX9ZnVd3HmNOarYUzEgOukYfKcubT6KykLVa/qvo13ceW3JTY8FrxdcKj7y2SvAuuTVKTrIg6podWnP914n5VjxV2DtCM/3VXOWW9nWYS4Db3h2Z8wpUJ5c1riakgV7EvyK8HoLKIhIRFulZV0R11oqdToBuSobohKzxChucQ1oJJyAXT2XZAh0c6hf3Dlx4qRZ1nMgjDFxzJ14DYcFOWMp3pHRGFbZlERZmgREQBERAEREAREQHO9Iej7Y/9yH1YzcjkHUyDqZHY/Y5+QtB14wowuRGmmOFT69x0X0FUlv2CyZbXBsRo6rvJ27fDTUG8Z0Zzh1FPMy7XtuvFR3g7g6FUn9yWd88Mn7/AEu8fCVKzzoTjAmBdc3AOOu1TqDo7tVpEYHAhwqDmCujT2jn2tM8S0y17bzDUd4OxGhUO0bLa+rm0a/udz48VBmZN8u72kIkt1GdBs4at46d6s5C0GRRhg4Zt8xuE50yONorJS0nwjcig0Guo/8AYK9ZEDgHNIIORC1TkoyIKOGOhGY+9lRn2ss7dhP+Lv8A1d94pwTyTp+yA6rmUB+XQ8tj3KJKWk+GbjwSBv7zeW4VxJzjIgq046tOY/bik3JsiCjhjoRmPvZK7oX2ZgzjSAWGtdVGJWuBCuC5UGhOI1FarYhARFaWVZLolHOq1ne7lw4qG0uSyTbpEezrPdGOGDRm7yG5XWSkq2G260UGu5O5O62wobWgBoAAyAXtc8pOR0RgomURFUuEREAREQBERAEREAREQBERAVVtWQyZZdfg4e64ZtPmNx/K4yHHiSr/AGEwMPhfmKaEHVveF9HUG1LMhzDCx45EZtO4KvGTiUlBSOfBBFRiCqafssg+0g4EY3R4t9P4WIjYsk/2cQXoZ91wypu3Y7t/k3EN4cA5pqDkQt01JHM04srbMtUP6j+q/sDvQ8P4Vk+GHAtcAQcwVX2nZYiVcygf3O58eKiyFqOYfZxqimF45j9W44qbrkVfBrnbNfDN+ETQY4Zt9R9lS5addEYCaDQ01VmXgCtcPvJV5a2pLW3amtOO6URdhF6YwuIDQSTkBqumsmxwyjn0LtBo31PFVlJRLxg5EWyrFrR8Ucm+bvTt2XQgLKLnlJy5OiMVFaMoiKCwREQBERAEREAREQBERAEREAREQBERARJ+SZGYWRG3mnuOhB0PFcFOScWRfq+C44HyPyu7jTs+jrVMS7XtLHgOa4UIOqtGTRSUVI5GXjte0OYag93AjQrTPyDIoxwcMnbcDuFEtWy4kk/2kOr4Tjrps1/k77MqBaDHsvNz1GoPFdEZKSOeUXFkCShPYCx9eqcMaih+Xhmp0tLue4NaKnwG5OgW+Tk3x3YZDNxyHDieC6uSk2wm3WjmdSdyqTmo6ReEG9s0WbZjYQrm45nyGwVgiLBuzdJLSMoiISEREAREQBERAEREAREQBERAEREAREQBERAEREBriww4FpAIIoQRUEHMELmoPRdrYrrrqQnUN3UHYHUcTjzzRFZOirVnSQYTWtAaKAZLaiKpYIiIAiIgCIiAIiIAiIgCIiAIiIAiIgP/2Q=="
            alt="Find Work"
            width={600}
            height={600}
            className="w-full h-2/3 object-cover shadow-sm"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 text-gray-800 text-lg leading-relaxed flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex items-start space-x-4  p-4  shadow-md">
              <FaUserPlus className="text-blue-500 text-3xl" />
              <p className="text-gray-800 text-base">
                <strong>Create an Account:</strong> Register on our platform to
                begin offering mentorship.
              </p>
            </div>
            <div className="flex items-start space-x-4  p-4 rounded-lg shadow-md">
              <FaUserEdit className="text-green-500 text-3xl" />
              <p className="text-gray-800 text-base">
                <strong>Complete Your Profile:</strong> Fill out your profile
                with detailed information about your skills, experience, and
                mentoring areas.
              </p>
            </div>
            <div className="flex items-start space-x-4  p-4 rounded-lg shadow-md">
              <FaCalendarCheck className="text-yellow-500 text-3xl" />
              <p className="text-gray-800 text-base">
                <strong>Profile Approval:</strong> Your profile will be reviewed
                and approved by the system to ensure it meets our criteria.
              </p>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg shadow-md">
              <FaHandshake className="text-purple-500 text-3xl" />
              <p className="text-gray-800 text-base">
                <strong>Connect with Mentors:</strong> Reach out to selected
                mentees and schedule mentoring sessions.
              </p>
            </div>
            <div className="flex items-start space-x-4  p-4 rounded-lg shadow-md">
              <FaArrowRight className="text-teal-500 text-3xl" />
              <p className="text-gray-800 text-base">
                <strong>Guide and Support:</strong> Provide guidance and support
                to help your mentees achieve their career goals.
              </p>
            </div>
          </div>
          <p className="mt-6 text-center md:text-left">
            By following these steps, you`&apos;`ll be well on your way to
            making a significant impact in your career or helping others advance
            their careers through our mentorship system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
