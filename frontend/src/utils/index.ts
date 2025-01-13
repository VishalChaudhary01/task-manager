import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

export function isTokenValid(token: string | null): boolean {
     if (!token) return false;
     try {
       const decoded = jwtDecode(token);
       const currentTime = Date.now()/1000;
       if (decoded.exp && decoded.exp > currentTime) {
          return true;
        }
        toast.error("Token has expired");
        return false;
     } catch (error) {
       console.error("Invalid token format", error);
       return false;
     }
}