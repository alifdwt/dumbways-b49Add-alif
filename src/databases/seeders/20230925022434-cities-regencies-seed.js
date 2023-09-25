const axios = require("axios");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/vionaaindah/GeoID-API/main/regencies.json"
      );
      const citiesData = response.data; // Data dari URL

      // Ubah data sesuai format yang dibutuhkan
      const formattedData = citiesData.map((city) => ({
        id: city.id,
        province_id: city.province_id,
        name: city.name,
        alt_name: city.alt_name,
        latitude: city.latitude,
        longitude: city.longitude,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("cities_regencies", formattedData, {});
    } catch (error) {
      console.error("Gagal mengambil data dari URL:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cities_regencies", null, {});
  },
};
