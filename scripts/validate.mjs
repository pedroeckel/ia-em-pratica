import { loadCatalog } from './lib/catalog.mjs';
try {
  const resources = await loadCatalog();
  console.log(`Catálogo válido: ${resources.length} recursos; evidências e integridade conferidas.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
