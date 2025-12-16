/* animação inicial */
document.addEventListener("DOMContentLoaded", function () {
    const offcanvas = new bootstrap.Offcanvas('#offcanvasTop')

    offcanvas.show();

    setTimeout(() => {
        offcanvas.hide()
    }, 3000)

    document.getElementById('offcanvasTop').addEventListener('hidden.bs.offcanvas', function () {
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    });

})