interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="w-full overflow-x-auto mt-5 border border-info-100 rounded-lg">
      <table className="w-full border border-info-100 overflow-hidden rounded-lg">
        <thead className="bg-info-100 text-sm">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-2 text-center border border-info-100"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm">{children}</tbody>
      </table>
    </div>
  );
}
