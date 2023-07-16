import axios from "axios";
import { useState } from "react";

const useAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);
  const [error, setError] = useState(null);

  const fetchAvailabilities = async ({
    slug,
    time,
    day,
    partySize,
  }: {
    slug: string;
    time: string;
    day: string;
    partySize: string;
  }) => {
    setLoading(true);
    console.log({ slug, time, day, partySize });
    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);

      return setData(response.data);
    } catch (error: any) {
      return setError(error.response.data.errorMessage);
    }
  };

  return { loading, data, error, fetchAvailabilities };
};

export default useAvailability;
