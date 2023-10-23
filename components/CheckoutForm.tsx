//This is a component inside the Checkout page, where the customer can fill in its information and place an order.
//We use the react-hook-form library to handle the form validation and submission.
// We send the data in format of the formSchema +  basket + subtotal to the backend.

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { Basket } from "@/components/BasketType";
import { useState } from "react";
import {CheckoutPopup} from "@/components/CheckoutPopup"
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const noNumber = new RegExp(/^([^0-9]*)$/);
const mustbeNumber = new RegExp(/^([0-9]*)$/);

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "You must fill in your name",
    })
    .max(250, { message: "Name is too long" })
    .regex(noNumber, { message: "No numbers!" })
    .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
  lastName: z
    .string()
    .min(2, {
      message: "You must fill in your last name",
    })
    .max(250, { message: "Name is too long" })
    .regex(noNumber, { message: "No numbers!" })
    .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
  email: z
    .string()
    .email({
      message: "You must fill in your email",
    })
    .max(250, { message: "email is too long" })
    .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  street: z
    .string()
    .min(5, {
      message: "You must fill in your street-address",
    })
    .max(250, { message: "Street-adress is too long" }),
  zipCode: z
    .string()
    .min(5, { message: "You must fill in your zipcode" })
    .max(5, { message: "Zipcode is too long" })
    .regex(mustbeNumber, { message: "Only numbers!" }),
  city: z
    .string()
    .min(2, {
      message: "You must fill in your city",
    })
    .max(250, { message: "Cityname is too long" })
    .regex(noNumber, { message: "No numbers!" })
    .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
});

export function CheckoutForm(basket: Basket, subtotal: number) {
  const [disable, setDisable] = useState(false);
  const [popmsg, setPopmsg]= useState('')

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setPopmsg('Din order skickas, vänta en stund')
    if (disable) return;
    setDisable(true);
    setInterval(() => {
      setDisable(false);
    }, 2000);

    const basketerino = basket.map((item) => {
      return {
        title: item.title,
        amount: item.amount,
        price: item.price,
        id: item.id,
        stock: item.stock,
      };
    });

    const sendingData = {
      ...values,
      basketerino,
      order_total: subtotal + 50,
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${process.env.NEXT_PUBLIC_STOREID}/checkout`,
        { sendingData }
      )
      .then(function (response) {
        setPopmsg('Tack för din beställning, glöm inte att betala!')
/*         toast.success("Tack för din beställning, glöm inte att betala!");
        setInterval(() => {
          window.location.href = "/";
        }, 3000); */
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      zipCode: "",
      city: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ditt förnamn:</FormLabel>
              <FormControl>
                <Input placeholder="Surname.." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ditt efternamn:</FormLabel>
              <FormControl>
                <Input placeholder="Lastname..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Din email-adress:</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ditt telefonnummer:</FormLabel>
              <FormControl>
                <Input placeholder="Phone..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Din gatuadress:</FormLabel>
              <FormControl>
                <Input placeholder="Street..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ditt postnummer:</FormLabel>
              <FormControl>
                <Input placeholder="ZipCode..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Din stad:</FormLabel>
              <FormControl>
                <Input placeholder="City..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      <AlertDialogTrigger type="submit" className="p-2 w-full flex justify-left">
        KÖP
      </AlertDialogTrigger>
        
{/*         <CheckoutPopup msg={popmsg}><Button type="submit">KÖP </Button></CheckoutPopup>
 */}       
       
      </form>
    </Form>
  );
}
