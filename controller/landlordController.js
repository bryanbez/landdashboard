// cant run the uploadImage function here because of browser environment. We use firebase-admin which is server side only

export const registerLandlord = async (formData) => {
  try {
    const response = await fetch("/api/landlord/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message,
        status: response.status,
      };
    }

    return {
      success: true,
      message: "Landlord registered successfully",
      status: response.status,
    };
  } catch (error) {
    console.error("Error registering landlord", error.message);
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
};
