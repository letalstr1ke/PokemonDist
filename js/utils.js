function random(min, max) {
  return Math.ceil(min + Math.random() * (max - min));
}

export default random;
