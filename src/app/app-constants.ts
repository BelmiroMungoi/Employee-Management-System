export class AppConstants {

    public static get baseServer(): string {
        return "https://employee-management-bbm-78ef7c687792.herokuapp.com/api/v1";
    }

    public static get baseLogin(): string {
        return this.baseServer + "/auth/authenticate";
    }
}