//This is a component inside the Checkout page, where the customer can fill in its information and place an order.
//We use the react-hook-form library to handle the form validation and submission.
// We send the data in format of the formSchema +  basket + subtotal to the backend.

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Basket } from "@/components/BasketType";
import { useState } from "react";
import { CheckoutPopup } from "@/components/CheckoutPopup";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const noNumber = new RegExp(/^([^0-9]*)$/);
const mustbeNumber = new RegExp(/^([0-9]*)$/);

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Du måste fylla i förnamn",
    })
    .max(250, { message: "aörnmnet är för långt" })
    .regex(noNumber, { message: "Inga nummer i förnamnet!" })
    .refine((s) => !s.includes(" "), {
      message: "Inga mellanslag i förnamnet!",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Du måste fylla i efternamn",
    })
    .max(250, { message: "Efternamnet är för långt" })
    .regex(noNumber, { message: "Inga nummer i efternamnet!" })
    .refine((s) => !s.includes(" "), {
      message: "Inga mellanslag i efternamnet!",
    }),
  email: z
    .string()
    .email({
      message: "Du måste fylla i e-mail",
    })
    .max(250, { message: "E-mail är för långt!" })
    .refine((s) => !s.includes(" "), { message: "Inga mellanslag i e-mailen" }),
  phone: z.string().regex(phoneRegex, "Felaktigt telefonnummer!"),
  street: z
    .string()
    .min(5, {
      message: "Du måste fylla i gatuadressen",
    })
    .max(250, { message: "Gatuadressen är för lång" }),
  zipCode: z
    .string()
    .min(5, { message: "Du måste fylla i postnummer" })
    .max(5, { message: "Postnummer får inte vara längre än 5 siffror " })
    .regex(mustbeNumber, { message: "Bara nummer!" }),
  city: z
    .string()
    .min(2, {
      message: "Du måste fylla i stadsnamnet",
    })
    .max(250, { message: "Stadsnamn är för långt" })
    .regex(noNumber, { message: "Inga nummer i stadsnamnet!" })
    .refine((s) => !s.includes(" "), {
      message: "Inga mellanslag  i stadsnamnet!",
    }),
});

export function CheckoutForm(basket: Basket, subtotal: number) {
  const [disable, setDisable] = useState(false);
  const [popmsg, setPopmsg] = useState("");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setPopmsg("Din order skickas, vänta en stund");
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
        setPopmsg("Tack för din beställning, glöm inte att betala!");
      })
      .catch(function (error) {
        setPopmsg(error.response.data);
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
              <FormLabel>Förnamn:</FormLabel>
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
              <FormLabel>Efternamn:</FormLabel>
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
              <FormLabel>Email-adress:</FormLabel>
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
              <FormLabel>Telefonnummer:</FormLabel>
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
              <FormLabel>Gatuadress:</FormLabel>
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
              <FormLabel>Postnummer:</FormLabel>
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
              <FormLabel>Stad:</FormLabel>
              <FormControl>
                <Input placeholder="City..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <CheckoutPopup msg={popmsg} />
      </form>
    </Form>
  );
}
