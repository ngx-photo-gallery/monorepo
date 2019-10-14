export function px(value: number): String {
  if (!value) {
    return '0';
  }
  return value.toString() + 'px';
}


export function url(location: String): String {
  return 'url(\'' + location + '\')';
}
