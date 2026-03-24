import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`;
        const res = await fetch(url, {
          headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        });
        const data = await res.json();
        if (!res.ok) {
          setStatus("invalid");
        } else if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleConfirm = async () => {
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <p className="text-muted-foreground font-body">Validating…</p>
        )}
        {status === "valid" && (
          <>
            <h1 className="font-display font-semibold text-2xl text-foreground">Unsubscribe</h1>
            <p className="text-muted-foreground font-body">
              Click below to stop receiving emails from NVTS Digital.
            </p>
            <button
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground font-display font-medium px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Confirm Unsubscribe
            </button>
          </>
        )}
        {status === "success" && (
          <>
            <h1 className="font-display font-semibold text-2xl text-foreground">You've been unsubscribed</h1>
            <p className="text-muted-foreground font-body">You won't receive any more emails from us.</p>
          </>
        )}
        {status === "already" && (
          <>
            <h1 className="font-display font-semibold text-2xl text-foreground">Already unsubscribed</h1>
            <p className="text-muted-foreground font-body">You're already unsubscribed from our emails.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <h1 className="font-display font-semibold text-2xl text-foreground">Invalid link</h1>
            <p className="text-muted-foreground font-body">This unsubscribe link is invalid or expired.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="font-display font-semibold text-2xl text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground font-body">Please try again later.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
