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
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { Basket } from "@/components/BasketType";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "You must fill in your name",
  }),
  lastname: z.string().min(2, {
    message: "You must fill in your last name",
  }),
  email: z.string().email({
    message: "You must fill in your email",
  }),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  street: z.string().min(5, {
    message: "You must fill in your address",
  }),
  zipCode: z.string().min(5, {
    message: "You must fill in your zip code",
  }),
  city: z.string().min(2, {
    message: "You must fill in your city",
  }),
});

export function CheckoutForm(basket: Basket, subtotal: number) {
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const basketerino = basket.map((item) => {
      return {
        title: item.title,
        amount: item.amount,
        price: item.price,
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
        toast.success("Tack för din beställning, glöm inte att betala!");
        setInterval(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
        <FormField
          control={form.control}
          name="firstname"
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
          name="lastname"
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
        <Button type="submit">KÖP</Button>
      </form>
    </Form>
  );
}
