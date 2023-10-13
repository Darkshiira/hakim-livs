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
  name: z.string().min(2, {
    message: "You must fill in your name",
  }),
  email: z.string().email({
    message: "You must fill in your email",
  }),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  address: z.string().min(5, {
    message: "You must fill in your address",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>För- och Efternamn</FormLabel>
              <FormControl>
                <Input placeholder="Name.." {...field} />
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Din adress:</FormLabel>
              <FormControl>
                <Input placeholder="Address..." {...field} />
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
