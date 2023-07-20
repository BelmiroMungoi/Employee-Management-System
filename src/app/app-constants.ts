export class AppConstants {

    public static get baseServer(): string {
        return "http://localhost:8080/api/v1";
    }

    public static get baseLogin(): string {
        return this.baseServer + "/auth/authenticate";
    }
}