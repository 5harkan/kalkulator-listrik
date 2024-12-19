document.getElementById("calculate").addEventListener("click", function () {
    // Ambil input dari pengguna
    const power = parseFloat(document.getElementById("power").value); // dalam watt
    const hours = parseFloat(document.getElementById("hours").value); // dalam jam
    const rate = parseFloat(document.getElementById("rate").value); // tarif per kWh
    const quantity = parseInt(document.getElementById("quantity").value); // jumlah perangkat
    const newPower = parseFloat(document.getElementById("new-power").value); // opsional

    // Validasi input
    if (isNaN(power) || isNaN(hours) || isNaN(rate) || isNaN(quantity) || quantity < 1) {
        document.getElementById("result").innerHTML =
            "<p style='color: red;'>Harap isi semua data yang diperlukan dengan benar!</p>";
        return;
    }

    // Perhitungan
    const totalPower = power * quantity; // Total daya semua perangkat
    const consumption = (totalPower * hours * 30) / 1000; // Konsumsi energi per bulan dalam kWh
    const cost = consumption * rate; // Biaya listrik per bulan

    let saving = 0;
    if (!isNaN(newPower)) {
        const newTotalPower = newPower * quantity; // Total daya perangkat baru
        const newConsumption = (newTotalPower * hours * 30) / 1000; // Konsumsi energi perangkat baru
        saving = cost - (newConsumption * rate);
    }

    // Tampilkan hasil
    let resultHTML = `<p>Total daya perangkat: <strong>${totalPower} Watt</strong></p>`;
    resultHTML += `<p>Konsumsi energi bulanan: <strong>${consumption.toFixed(2)} kWh</strong></p>`;
    resultHTML += `<p>Biaya listrik bulanan: <strong>Rp${formatRupiah(cost)}</strong></p>`;
    if (saving > 0) {
        resultHTML += `<p>Potensi penghematan dengan perangkat baru: <strong>Rp${formatRupiah(saving)}</strong></p>`;
    } else if (saving < 0) {
        resultHTML += `<p>Perangkat baru lebih boros: <strong>Rp${formatRupiah(-saving)}</strong></p>`;
    }

    document.getElementById("result").innerHTML = resultHTML;
});

// Fungsi untuk format ke Rupiah
function formatRupiah(number) {
    return `Rp${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}
