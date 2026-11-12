import importlib,json,pathlib,sys,unittest
import carrinho
base=pathlib.Path.cwd().resolve()
suite=unittest.defaultTestLoader.discover("tests")
def flatten(s):
 for t in s:
  if isinstance(t,unittest.TestSuite): yield from flatten(t)
  else: yield t
modules={t.__class__.__module__ for t in flatten(suite)}
paths={name:str(pathlib.Path(importlib.import_module(name).__file__).resolve()) for name in modules}
paths["carrinho"]=str(pathlib.Path(carrinho.__file__).resolve())
assert all(pathlib.Path(p).is_relative_to(base) for p in paths.values()),paths
print("IMPORT_PROOF="+json.dumps(paths,sort_keys=True),flush=True)
print("CASE_COUNT="+str(suite.countTestCases()),flush=True)
assert suite.countTestCases()==26
r=unittest.TextTestRunner(verbosity=2).run(suite)
print("COUNTS="+json.dumps(dict(tests=r.testsRun,failures=len(r.failures),errors=len(r.errors),skips=len(r.skipped))),flush=True)
sys.exit(0 if r.wasSuccessful() else 1)
