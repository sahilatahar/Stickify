import Link from 'next/link';

function Pricing() {
  return (
    <section className="section">
      <h1 className="section-title flex items-center gap-4">
        <hr className="w-2/3" />
        <span className="min-w-fit">Pricing</span>
        <hr className="w-2/3" />
      </h1>
      <div className="mx-auto flex w-full flex-col lg:w-[50rem]">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="text-surface min-w-full table-fixed text-left font-light">
                <thead className="text-center font-medium text-text-primary">
                  <tr>
                    <th scope="col" className="border px-6 py-4">
                      Stickers Quantity
                    </th>
                    <th scope="col" className="border px-6 py-4">
                      Original Price
                    </th>
                    <th scope="col" className="border px-6 py-4">
                      Discount
                    </th>
                    <th scope="col" className="border px-6 py-4">
                      Discounted Price
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center font-medium text-text-primary">
                  <tr>
                    <td className="whitespace-nowrap border px-6 py-4">
                      10 Stickers
                    </td>
                    <td className="whitespace-nowrap border px-6 py-4">
                      Rs. 120
                    </td>
                    <td className="whitespace-nowrap border px-6 py-4">0%</td>
                    <td className="whitespace-nowrap border px-6 py-4">
                      Rs. 120
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap border px-6 py-4">
                      20 Stickers
                    </td>
                    <td className="whitespace-nowrap border px-6 py-4">
                      Rs. 240
                    </td>
                    <td className="whitespace-nowrap border px-6 py-4">5%</td>
                    <td className="whitespace-nowrap border px-6 py-4">
                      Rs. 225
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap border px-6 py-4">
                      30 Stickers
                    </td>
                    <td className="whitespace-nowrap border px-6 py-4">
                      Rs. 360
                    </td>
                    <td className="whitespace-nowrap border px-6 py-4">10%</td>
                    <td className="whitespace-nowrap border px-6 py-4">
                      Rs. 320
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap border px-6 py-4">
                      40 Stickers
                    </td>
                    <td className="whitespace-nowrap border px-6 py-4">
                      Rs. 480
                    </td>
                    <td className="whitespace-nowrap border px-6 py-4">15%</td>
                    <td className="whitespace-nowrap border px-6 py-4">
                      Rs. 400
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-md text-success text-end font-medium">
          All India Shipping: Rs. 60
        </p>
        <div className="pt-4">
          <span className="text-xl font-medium text-text-primary">
            For Bulk Orders:
          </span>{' '}
          <br />
          <p className="text-lg text-text-secondary">
            If you&apos;re interested in ordering a large quantity of stickers,
            please{' '}
            <Link href="/contact-us" className="text-primary">
              Contact Us
            </Link>{' '}
            for special pricing and details
          </p>
          <p className="pt-4 text-lg text-text-secondary">
            If you have any questions or need further assistance, feel free to
            ask! 😊
          </p>
        </div>
      </div>
    </section>
  );
}
export default Pricing;
