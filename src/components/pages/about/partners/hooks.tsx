import { useEffect, useState } from "react";
import { PartnersApi } from "../api/partners";
import type { PartnerProfile, PartnerTab } from "../types";
import { mapDbPartner } from "../types";

export function usePartnersData(activeTab: PartnerTab) {
  const [rows, setRows] = useState<PartnerProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const data =
          activeTab === "partners"
            ? await PartnersApi.listPartners()
            : await PartnersApi.listFunders();

        const mapped = (Array.isArray(data) ? data : []).map(mapDbPartner);
        setRows(mapped);
      } catch (err) {
        console.error(err);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [activeTab]);

  return { rows, loading };
}