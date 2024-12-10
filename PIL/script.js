document.getElementById("calculate").addEventListener("click", function() {
    // Ambil input dari pengguna
    const power = parseFloat(document.getElementById("power").value); // dalam watt
    const hours = parseFloat(document.getElementById("hours").value); // dalam jam
    const rate = parseFloat(document.getElementById("rate").value); // tarif per kWh
    const newPower = parseFloat(document.getElementById("new-power").value); // opsional

    // Validasi input
    if (isNaN(power) || isNaN(hours) || isNaN(rate)) {
        alert("Harap isi semua data yang diperlukan!");
        return;
    }

    // Perhitungan
    const consumption = (power * hours * 30) / 1000; // Konsumsi energi per bulan dalam kWh
    const cost = consumption * rate; // Biaya listrik per bulan

    let saving = 0;
    if (!isNaN(newPower)) {
        const newConsumption = (newPower * hours * 30) / 1000;
        saving = cost - (newConsumption * rate);
    }

    // Tampilkan hasil
    let resultHTML = `<p>Konsumsi energi bulanan: <strong>${consumption.toFixed(2)} kWh</strong></p>`;
    resultHTML += `<p>Biaya listrik bulanan: <strong>Rp${cost.toFixed(2)}</strong></p>`;
    if (saving > 0) {
        resultHTML += `<p>Potensi penghematan dengan perangkat baru: <strong>Rp${saving.toFixed(2)}</strong></p>`;
    }

    document.getElementById("result").innerHTML = resultHTML;
});
