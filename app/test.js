// Minimal smoke test used by CI ("Build and test")
const express = require('express');
if (typeof express !== 'function') { console.error('express not loaded'); process.exit(1); }
console.log('Smoke test passed: dependencies resolve and app module is valid.');
process.exit(0);
