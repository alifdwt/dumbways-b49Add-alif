const axios = require("axios");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/villages.json"
      );
      const villagesData = response.data; // Data dari URL

      // Ubah data sesuai format yang dibutuhkan
      const formattedData = villagesData.map((village) => ({
        id: village.id,
        district_id: village.district_id,
        name: village.name,
        latitude: village.latitude,
        longitude: village.longitude,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("villages", formattedData, {});
    } catch (error) {
      console.error("Gagal mengambil data dari URL:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("villages", null, {});
  },
};
