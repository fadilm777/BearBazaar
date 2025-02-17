import { useEffect, useState } from "react";
import { getFile } from "@/backend/upload";

export default function UserImage({ id, ...other }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      setLoading(true);

      try {
        const blob = await getFile(id);
        setImage((prev) => {
          if (prev) {
            URL.revokeObjectURL(prev);
          }

          return URL.createObjectURL(blob);
        });
      } catch (error) {
        setError(error.message);
        console.error(error);
      }

      setLoading(false);
    })();

    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [id]);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return (
      <p>Error: {error}</p>
    );
  }

  return (
    <img src={image} {...other} />
  );
}
