import { baseUrl } from "../config/api";
import { useTermsStore } from "../stores/termsStore";
import { useState, useEffect } from "react";
export const useTerms = () => {
  const { setTerms, terms } = useTermsStore()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function fetchTerms() {
    try {
      const response = await fetch(`${baseUrl}/term`);
      const terms = await response.json();
      setTerms(terms.terms);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTerms();
  }, []);
  return { terms, loading, error };
}
