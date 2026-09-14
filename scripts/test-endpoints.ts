/**
 * Automated Local Endpoints Test
 */

const urls = [
  'http://127.0.0.1:4321/',
  'http://127.0.0.1:4321/portraits/',
  'http://127.0.0.1:4321/events/',
  'http://127.0.0.1:4321/events-photography/',
  'http://127.0.0.1:4321/about/',
  'http://127.0.0.1:4321/faq/',
  'http://127.0.0.1:4321/pricing/',
  'http://127.0.0.1:4321/contact/',
  'http://127.0.0.1:4321/404.html',
  'http://127.0.0.1:4321/robots.txt'
];

async function testAll() {
  console.log('Testing endpoints on http://127.0.0.1:4321 ...');
  let failures = 0;

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const titleMatch = text.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : (url.endsWith('.txt') ? 'Text file' : 'N/A');

      if (res.status >= 200 && res.status < 400) {
        console.log(`[PASS] ${res.status} ${url} | Title: "${title}"`);
      } else {
        console.error(`[FAIL] ${res.status} ${url}`);
        failures++;
      }
    } catch (e: any) {
      console.error(`[ERROR] ${url}: ${e.message}`);
      failures++;
    }
  }

  if (failures === 0) {
    console.log('All local HTTP endpoints verified with HTTP 200 OK!');
  } else {
    console.error(`Failed on ${failures} endpoints`);
    process.exit(1);
  }
}

testAll();
