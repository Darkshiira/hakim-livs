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
/*   children, */
  msg,
}: {
  /* children: React.ReactNode; */
  msg: string;
}) => {
  const { storeID } = useParams();

  return (
    <div>
    <AlertDialog>
      <AlertDialogTrigger type="submit" className={"bg-primary text-primary-foreground hover:bg-primary/90 p-2 w-1/3 rounded"}>
        KÖP
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`${msg}`}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={()=>window.location.href = "/"}>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
};
