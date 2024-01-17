export class GlobalConstants{

   //Message
   public static genericError: string= "Something went wrong. Please try again later!";

   public static unauthorized: string= "You are not authorized person to access this page!";

   public static error: string= "Error!";

   //Regex
   public static nameRegex: string="[a-zA-Z0-9 ]*";

   public static emailRegex: string="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

   public static telephoneNumberRegex: string="^[e0-9]{10,10}$";

   public static roleRegex: string="^(Admin|User)$";

}