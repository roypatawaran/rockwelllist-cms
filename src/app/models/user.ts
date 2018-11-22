export class User {
    constructor(
    public username: String,
	public signupEmail: String,
	public firstName: String,
	public lastName: String,
	public password: String,
	public birthDate: String,
	public sex: String,
	public mobileNumber: String,
	public isValidated: String,
	public accessCode: String,
	public forgotPassword: String,
	public facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	}) { }
  }
  