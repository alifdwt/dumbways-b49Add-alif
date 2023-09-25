const axios = require("axios");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/provinces.json"
      );
      const provincesData = response.data; // Data dari URL

      // Ubah data sesuai format yang dibutuhkan
      const formattedData = provincesData.map((province) => ({
        id: province.id,
        name: province.name,
        alt_name: province.alt_name,
        latitude: province.latitude,
        longitude: province.longitude,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("provinces", formattedData, {});
    } catch (error) {
      console.error("Gagal mengambil data dari URL:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("provinces", null, {});
  },
};
