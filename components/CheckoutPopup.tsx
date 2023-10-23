import { useParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const CheckoutPopup = ({
  children,
  msg,
}: {
  children: React.ReactNode;
  msg: string;
}) => {

  return (
    <AlertDialog>
{children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`${msg}`}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={()=>window.location.href = "/"}>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
