class TracerouteService {

  static async search(value: string, callback = false) {

    return new Promise((resolve, reject) => {
      try {
        let tracer = new window.services.Traceroute();
        tracer
          .on('destination', (destination: string) => {
            console.log(`destination: ${destination}`);
          })
          .on('hop', (hop: any) => {
            if (callback) {
              callback(hop);
            }
            console.log(`hop: ${JSON.stringify(hop)}`);
          })
          .on('close', (code: number) => {
            console.log("close", code);
            resolve(code);
          });
        tracer.trace(value);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default TracerouteService;
