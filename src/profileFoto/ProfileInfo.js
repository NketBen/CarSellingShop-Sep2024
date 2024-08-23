

import { useEffect, useState } from "react";
import { useAuth, upload } from "./StorageInfo";

export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://mx.depositphotos.com/39238767/stock-illustration-businessman-avatar-profile-picture.html"
  );

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div className="fields">
      <input type="file" onChange={handleChange} />
      <button
        disabled={loading || !photo}
        onClick={handleClick}
        style={{ backgroundColor: "blue", color: "white", margin: "4px" }}
      >
        Upload
      </button>
      <img src={photoURL} alt="Avatar" className="avatar" />
      <div>
        Perfile de Usuario: {currentUser?.displayName}, {currentUser?.email}{" "}
      </div>
    </div>
  );
}