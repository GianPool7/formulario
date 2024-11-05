document.getElementById('claimForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío normal del formulario

    const formData = new FormData(this);
    const claim = Object.fromEntries(formData);

    fetch('/api/reclamos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(claim),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.subject);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});