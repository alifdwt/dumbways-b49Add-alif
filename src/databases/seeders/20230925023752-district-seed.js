const axios = require("axios");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/districts.json"
      );
      const districtsData = response.data; // Data dari URL

      // Ubah data sesuai format yang dibutuhkan
      const formattedData = districtsData.map((district) => ({
        id: district.id,
        regency_id: district.regency_id,
        name: district.name,
        alt_name: district.alt_name,
        latitude: district.latitude,
        longitude: district.longitude,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("districts", formattedData, {});
    } catch (error) {
      console.error("Gagal mengambil data dari URL:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("districts", null, {});
  },
};
