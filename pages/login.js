import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Avoid refresh page on submit :)
    await axios
      .post("/api/auth/login", credentials)
      .then(response => {
        if (response.status == 200){
           router.push("/profile");
        }
     })
      .catch((error) => {
        console.log('Error', error)
        toast(error.response.data.error, { hideProgressBar: true, autoClose: 2000, type: 'error', position: 'bottom-right'})
      });
  };

  return (
    <div className="py-10 px-2 w-80 m-auto h-screen">
      <svg
        className="mt-10 mb-2"
        width="216"
        height="28"
        viewBox="0 0 216 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.173296 20V0.363636H5.36364V3.82812H5.59375C6.00284 2.67756 6.68466 1.76989 7.6392 1.10511C8.59375 0.440341 9.7358 0.107955 11.0653 0.107955C12.4119 0.107955 13.5582 0.444602 14.5043 1.1179C15.4503 1.78267 16.081 2.68608 16.3963 3.82812H16.6009C17.0014 2.70312 17.7259 1.80398 18.7741 1.13068C19.831 0.448864 21.0795 0.107955 22.5199 0.107955C24.3523 0.107955 25.8395 0.691761 26.9815 1.85938C28.1321 3.01847 28.7074 4.66335 28.7074 6.79403V20H23.2741V7.8679C23.2741 6.77699 22.9844 5.95881 22.4048 5.41335C21.8253 4.8679 21.1009 4.59517 20.2315 4.59517C19.2429 4.59517 18.4716 4.91051 17.9176 5.54119C17.3636 6.16335 17.0866 6.98579 17.0866 8.00852V20H11.8068V7.75284C11.8068 6.78977 11.5298 6.02273 10.9759 5.4517C10.4304 4.88068 9.71023 4.59517 8.81534 4.59517C8.21023 4.59517 7.66477 4.74858 7.17898 5.0554C6.7017 5.35369 6.32244 5.77557 6.04119 6.32102C5.75994 6.85795 5.61932 7.48864 5.61932 8.21307V20H0.173296ZM45.6016 11.6392V0.363636H51.0476V20H45.8189V16.4332H45.6143C45.1712 17.5838 44.4339 18.5085 43.4027 19.2074C42.38 19.9062 41.1314 20.2557 39.657 20.2557C38.3445 20.2557 37.1896 19.9574 36.1925 19.3608C35.1953 18.7642 34.4155 17.9162 33.853 16.8168C33.299 15.7173 33.0178 14.4006 33.0092 12.8665V0.363636H38.4553V11.8949C38.4638 13.054 38.7749 13.9702 39.3885 14.6435C40.0021 15.3168 40.8246 15.6534 41.8558 15.6534C42.5121 15.6534 43.1257 15.5043 43.6967 15.206C44.2678 14.8991 44.728 14.4474 45.0774 13.8509C45.4354 13.2543 45.6101 12.517 45.6016 11.6392ZM71.7418 5.96307L66.756 6.26989C66.6708 5.84375 66.4876 5.46023 66.2063 5.11932C65.9251 4.76989 65.5543 4.4929 65.0941 4.28835C64.6424 4.07528 64.1012 3.96875 63.4705 3.96875C62.6268 3.96875 61.9151 4.14773 61.3356 4.50568C60.756 4.85511 60.4663 5.32386 60.4663 5.91193C60.4663 6.38068 60.6538 6.77699 61.0288 7.10085C61.4038 7.42472 62.0472 7.68466 62.9592 7.88068L66.5131 8.59659C68.4222 8.98864 69.8455 9.61932 70.783 10.4886C71.7205 11.358 72.1893 12.5 72.1893 13.9148C72.1893 15.2017 71.81 16.331 71.0515 17.3026C70.3015 18.2741 69.2702 19.0327 67.9577 19.5781C66.6538 20.1151 65.1495 20.3835 63.445 20.3835C60.8455 20.3835 58.7745 19.8423 57.2319 18.7599C55.6978 17.669 54.7987 16.1861 54.5344 14.3111L59.891 14.0298C60.0529 14.8224 60.445 15.4276 61.0671 15.8452C61.6893 16.2543 62.4862 16.4588 63.4577 16.4588C64.4123 16.4588 65.1793 16.2756 65.7589 15.9091C66.3469 15.5341 66.6452 15.0526 66.6538 14.4645C66.6452 13.9702 66.4364 13.5653 66.0273 13.25C65.6183 12.9261 64.9876 12.679 64.1353 12.5085L60.7347 11.831C58.8171 11.4474 57.3896 10.7827 56.4521 9.83665C55.5231 8.89062 55.0586 7.68466 55.0586 6.21875C55.0586 4.95739 55.3995 3.87074 56.0813 2.95881C56.7717 2.04688 57.739 1.34375 58.9833 0.849431C60.2362 0.355114 61.7021 0.107955 63.381 0.107955C65.8612 0.107955 67.8129 0.632102 69.2362 1.6804C70.668 2.72869 71.5032 4.15625 71.7418 5.96307ZM84.5675 20.3835C82.5476 20.3835 80.8089 19.9744 79.3516 19.1562C77.9027 18.3295 76.7862 17.1619 76.0021 15.6534C75.218 14.1364 74.826 12.3423 74.826 10.2713C74.826 8.25142 75.218 6.47869 76.0021 4.95312C76.7862 3.42756 77.8899 2.23864 79.3132 1.38636C80.745 0.534091 82.424 0.107955 84.3501 0.107955C85.6456 0.107955 86.8516 0.316761 87.968 0.734375C89.093 1.14347 90.0732 1.76136 90.9084 2.58807C91.7521 3.41477 92.4084 4.45455 92.8771 5.70739C93.3459 6.9517 93.5803 8.40909 93.5803 10.0795V11.5753H76.9993V8.20028H88.4538C88.4538 7.41619 88.2834 6.72159 87.9425 6.11648C87.6016 5.51136 87.1286 5.03835 86.5234 4.69744C85.9268 4.34801 85.2322 4.1733 84.4396 4.1733C83.6129 4.1733 82.88 4.36506 82.2408 4.74858C81.6101 5.12358 81.1158 5.63068 80.7578 6.26989C80.3999 6.90057 80.2166 7.60369 80.2081 8.37926V11.5881C80.2081 12.5597 80.3871 13.3991 80.745 14.1065C81.1115 14.8139 81.6271 15.3594 82.2919 15.7429C82.9567 16.1264 83.745 16.3182 84.657 16.3182C85.2621 16.3182 85.8161 16.233 86.3189 16.0625C86.8217 15.892 87.2521 15.6364 87.6101 15.2955C87.968 14.9545 88.2408 14.5369 88.4283 14.0426L93.4652 14.375C93.2095 15.5852 92.6854 16.642 91.8928 17.5455C91.1087 18.4403 90.0945 19.1392 88.8501 19.642C87.6143 20.1364 86.1868 20.3835 84.5675 20.3835ZM109.727 11.6392V0.363636H115.173V20H109.944V16.4332H109.739C109.296 17.5838 108.559 18.5085 107.528 19.2074C106.505 19.9062 105.256 20.2557 103.782 20.2557C102.469 20.2557 101.315 19.9574 100.317 19.3608C99.3203 18.7642 98.5405 17.9162 97.978 16.8168C97.424 15.7173 97.1428 14.4006 97.1342 12.8665V0.363636H102.58V11.8949C102.589 13.054 102.9 13.9702 103.513 14.6435C104.127 15.3168 104.95 15.6534 105.981 15.6534C106.637 15.6534 107.251 15.5043 107.822 15.206C108.393 14.8991 108.853 14.4474 109.202 13.8509C109.56 13.2543 109.735 12.517 109.727 11.6392ZM119.529 20V0.363636H124.719V3.82812H124.949C125.358 2.67756 126.04 1.76989 126.995 1.10511C127.949 0.440341 129.091 0.107955 130.421 0.107955C131.767 0.107955 132.914 0.444602 133.86 1.1179C134.806 1.78267 135.436 2.68608 135.752 3.82812H135.956C136.357 2.70312 137.081 1.80398 138.13 1.13068C139.186 0.448864 140.435 0.107955 141.875 0.107955C143.708 0.107955 145.195 0.691761 146.337 1.85938C147.488 3.01847 148.063 4.66335 148.063 6.79403V20H142.63V7.8679C142.63 6.77699 142.34 5.95881 141.76 5.41335C141.181 4.8679 140.456 4.59517 139.587 4.59517C138.598 4.59517 137.827 4.91051 137.273 5.54119C136.719 6.16335 136.442 6.98579 136.442 8.00852V20H131.162V7.75284C131.162 6.78977 130.885 6.02273 130.331 5.4517C129.786 4.88068 129.066 4.59517 128.171 4.59517C127.566 4.59517 127.02 4.74858 126.534 5.0554C126.057 5.35369 125.678 5.77557 125.397 6.32102C125.115 6.85795 124.975 7.48864 124.975 8.21307V20H119.529Z"
          fill="#7A7A7A"
        />
        <path
          d="M157.964 20.3707C156.711 20.3707 155.595 20.1534 154.615 19.7188C153.635 19.2756 152.859 18.6236 152.288 17.7628C151.725 16.8935 151.444 15.8111 151.444 14.5156C151.444 13.4247 151.645 12.5085 152.045 11.767C152.446 11.0256 152.991 10.429 153.681 9.97727C154.372 9.52557 155.156 9.18466 156.034 8.95455C156.92 8.72443 157.849 8.5625 158.821 8.46875C159.963 8.34943 160.883 8.23864 161.582 8.13636C162.281 8.02557 162.788 7.86364 163.103 7.65057C163.419 7.4375 163.576 7.12216 163.576 6.70455V6.62784C163.576 5.81818 163.321 5.19176 162.809 4.74858C162.306 4.3054 161.591 4.08381 160.662 4.08381C159.681 4.08381 158.902 4.30114 158.322 4.7358C157.743 5.16193 157.359 5.69886 157.172 6.34659L152.135 5.9375C152.39 4.74432 152.893 3.71307 153.643 2.84375C154.393 1.96591 155.36 1.29261 156.545 0.823862C157.738 0.346591 159.119 0.107955 160.687 0.107955C161.778 0.107955 162.822 0.235795 163.819 0.491476C164.825 0.747159 165.716 1.14347 166.491 1.6804C167.275 2.21733 167.893 2.90767 168.345 3.75142C168.797 4.58665 169.022 5.58807 169.022 6.75568V20H163.858V17.277H163.704C163.389 17.8906 162.967 18.4318 162.439 18.9006C161.91 19.3608 161.275 19.723 160.534 19.9872C159.792 20.2429 158.936 20.3707 157.964 20.3707ZM159.524 16.6122C160.325 16.6122 161.032 16.4545 161.646 16.1392C162.26 15.8153 162.741 15.3807 163.091 14.8352C163.44 14.2898 163.615 13.6719 163.615 12.9815V10.8977C163.444 11.0085 163.21 11.1108 162.912 11.2045C162.622 11.2898 162.294 11.3707 161.927 11.4474C161.561 11.5156 161.194 11.5795 160.828 11.6392C160.461 11.6903 160.129 11.7372 159.831 11.7798C159.191 11.8736 158.633 12.0227 158.156 12.2273C157.679 12.4318 157.308 12.7088 157.044 13.0582C156.779 13.3991 156.647 13.8253 156.647 14.3366C156.647 15.0781 156.916 15.6449 157.453 16.0369C157.998 16.4205 158.689 16.6122 159.524 16.6122ZM173.248 27.3636V0.363636H178.617V3.66193H178.86C179.098 3.13352 179.444 2.59659 179.895 2.05114C180.355 1.49716 180.952 1.03693 181.685 0.670455C182.426 0.295455 183.347 0.107955 184.446 0.107955C185.878 0.107955 187.199 0.482955 188.409 1.23295C189.62 1.97443 190.587 3.09517 191.311 4.59517C192.036 6.08665 192.398 7.95739 192.398 10.2074C192.398 12.3977 192.044 14.2472 191.337 15.7557C190.638 17.2557 189.684 18.3935 188.473 19.169C187.272 19.9361 185.925 20.3196 184.434 20.3196C183.377 20.3196 182.478 20.1449 181.736 19.7955C181.003 19.446 180.402 19.0071 179.934 18.4787C179.465 17.9418 179.107 17.4006 178.86 16.8551H178.694V27.3636H173.248ZM178.578 10.1818C178.578 11.3494 178.74 12.3679 179.064 13.2372C179.388 14.1065 179.857 14.7841 180.471 15.2699C181.084 15.7472 181.83 15.9858 182.708 15.9858C183.594 15.9858 184.344 15.7429 184.958 15.2571C185.571 14.7628 186.036 14.081 186.351 13.2116C186.675 12.3338 186.837 11.3239 186.837 10.1818C186.837 9.04829 186.679 8.05114 186.364 7.19034C186.049 6.32955 185.584 5.65625 184.971 5.17045C184.357 4.68466 183.603 4.44176 182.708 4.44176C181.821 4.44176 181.071 4.67614 180.458 5.14489C179.853 5.61364 179.388 6.27841 179.064 7.1392C178.74 8 178.578 9.0142 178.578 10.1818ZM196.029 27.3636V0.363636H201.398V3.66193H201.641C201.88 3.13352 202.225 2.59659 202.676 2.05114C203.137 1.49716 203.733 1.03693 204.466 0.670455C205.208 0.295455 206.128 0.107955 207.228 0.107955C208.659 0.107955 209.98 0.482955 211.191 1.23295C212.401 1.97443 213.368 3.09517 214.093 4.59517C214.817 6.08665 215.179 7.95739 215.179 10.2074C215.179 12.3977 214.826 14.2472 214.118 15.7557C213.419 17.2557 212.465 18.3935 211.255 19.169C210.053 19.9361 208.706 20.3196 207.215 20.3196C206.158 20.3196 205.259 20.1449 204.517 19.7955C203.784 19.446 203.184 19.0071 202.715 18.4787C202.246 17.9418 201.888 17.4006 201.641 16.8551H201.475V27.3636H196.029ZM201.36 10.1818C201.36 11.3494 201.522 12.3679 201.846 13.2372C202.169 14.1065 202.638 14.7841 203.252 15.2699C203.865 15.7472 204.611 15.9858 205.489 15.9858C206.375 15.9858 207.125 15.7429 207.739 15.2571C208.353 14.7628 208.817 14.081 209.132 13.2116C209.456 12.3338 209.618 11.3239 209.618 10.1818C209.618 9.04829 209.461 8.05114 209.145 7.19034C208.83 6.32955 208.365 5.65625 207.752 5.17045C207.138 4.68466 206.384 4.44176 205.489 4.44176C204.603 4.44176 203.853 4.67614 203.239 5.14489C202.634 5.61364 202.169 6.27841 201.846 7.1392C201.522 8 201.36 9.0142 201.36 10.1818Z"
          fill="#D73737"
        />
      </svg>
      <form className="inline-block">
        <input
          className="w-full border-gray-200 border-2 rounded-lg px-4 py-2 my-4 placeholder:text-slate-50"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="w-full border-gray-200 border-2 rounded-lg px-4 py-2 my-4 placeholder:text-slate-50"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          className="rounded-lg pointer w-full px-4 py-4 font-bold text-white ease-in duration-300 bg-red-700 hover:bg-slate-200 hover:text-black"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
