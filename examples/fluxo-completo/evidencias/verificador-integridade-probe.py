import carrinho,json,pathlib,sys
from carrinho import Item,subtotal,calcular_total
assert pathlib.Path(carrinho.__file__).resolve().is_relative_to(pathlib.Path.cwd().resolve())
checks=[]
for function in (subtotal,calcular_total):
 for invalid in (False,True):
  items=[Item(1990,2),Item(-1 if invalid else 550,3)]
  values=tuple((x.preco_centavos,x.quantidade) for x in items)
  ids=tuple(map(id,items))
  raised=False
  try: function(items)
  except ValueError: raised=True
  assert raised==invalid
  observed=tuple((x.preco_centavos,x.quantidade) for x in items)
  checks.append(dict(function=function.__name__,error=invalid,before=values,after=observed))
  print(json.dumps(checks[-1]),flush=True)
  assert observed==values,(function.__name__,invalid,values,observed)
  assert tuple(map(id,items))==ids
print("INDEPENDENT_VALUE_SNAPSHOTS=4 passed")
