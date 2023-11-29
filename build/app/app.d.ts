import "dotenv/config";
declare class App {
    limiter: import("express-rate-limit").RateLimitRequestHandler;
    port: string | undefined;
    app: import("express-serve-static-core").Express;
    App(): void;
}
export default App;
