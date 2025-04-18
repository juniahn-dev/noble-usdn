import axios from "axios";

const fetchData = async (
  url: string,
  method = "GET",
  data?: Record<string, unknown> | FormData,
  isFormData = false
) => {
  const params = method.toLowerCase() === "post" ? undefined : data;

  try {
    const result = await axios({
      method,
      url,
      data,
      params,
      timeout: 5 * 1000,
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        "x-api-key": btoa(process.env.NEXT_PUBLIC_SECRET_KEY || ""),
      },
    });

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchData;
