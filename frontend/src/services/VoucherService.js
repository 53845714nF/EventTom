export const fetchAllVouchersForUser = async (userId) => {
  try {
    // Static mock data for demonstration
    const mockVouchers = [
      {
        id: 1,
        code: "ASDFLOFVNFDVO",
        amount: 20,
        expiryDate: "2025.01.21",
      },
      {
        id: 2,
        code: "ÜUUOIPTZUGHJM",
        amount: 200,
        expiryDate: "2025.01.21",
      },
      {
        id: 3,
        code: "UTJDF4567FSGBS",
        amount: 20,
        expiryDate: "2025.01.21",
      },
    ];

    // Simulating an API delay
    return new Promise((resolve) => setTimeout(() => resolve(mockVouchers), 500));
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    return []; // Return an empty array if an error occurs
  }
};
