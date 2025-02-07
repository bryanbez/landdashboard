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

export const checkLandIfItsOwned = async (urlParams) => {
  let { from, to, landId } = urlParams;
  try {
    const response = await fetch(
      `https://api-lok-live.leagueofkingdoms.com/api/stat/land/contribution?landId=${landId}&from=${from}&to=${to}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (data.result === true) {
      return {
        success: true,
        message: "Land is owned by the player",
        status: response.status,
      };
    }
    return {
      success: false,
      message: data.err.code,
      status: response.status,
    };
  } catch (error) {
    console.error("Error checking land ownership", error.message);
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const checkLandOnInput = async (landId) => {
  try {
    const response = await fetch(`/api/landlord/check-land/${landId}`, {
      method: "GET",
    });

    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        message: "Land is available",
        status: response.status,
      };
    }
    return {
      success: false,
      message: data.message,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
};
