export const buildSetRandomWorldSpawnCommand = () => {
  const x = Math.floor(Math.random() * 10000);
  const z = Math.floor(Math.random() * 10000);
  const y = 200;
  return `setworldspawn ${x} ${y} ${z}`;
};
