fetch('https://google.com')
    .then(res => console.log('Network OK:', res.status))
    .catch(err => console.error('Network Error:', err.message));
