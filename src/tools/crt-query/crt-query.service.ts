class CrtQueryService {
  static async search(domain: string) {
    return await fetch('https://crt.sh/json?q=' + domain).then((res) => res.json());
  }
}


export default CrtQueryService
