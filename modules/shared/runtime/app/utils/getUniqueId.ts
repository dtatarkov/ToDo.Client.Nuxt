let lastElementId = 0;

export function getUniqueId(prefix = '')
{
  const id = [prefix, lastElementId++].join('-')

  return id;
}