import https from 'https';

https.get('https://factorled.pk/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const hexRegex = /#[0-9a-fA-F]{6}\b/g;
    const matches = data.match(hexRegex) || [];
    const counts = {};
    matches.forEach(m => {
      const lower = m.toLowerCase();
      counts[lower] = (counts[lower] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    console.log('Top colors found on factorled.pk:');
    sorted.slice(0, 15).forEach(([color, count]) => {
      console.log(color + ' (' + count + ' times)');
    });
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
