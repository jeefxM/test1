export const saveCustomerInfo = async (info) => {
    const response = await fetch("/api/db/updateuser", {
      method: "POST",
      body: JSON.stringify(info),
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return await response.json();
    }
  };

