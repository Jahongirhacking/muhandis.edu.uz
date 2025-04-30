import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import { IApplication } from "../services/applicant/types";
import { getApplicationChoiceName, getApplicationStatusName, getRoleName } from "../services/types";

type ExcelProps = {
    data: IApplication[];              // Array of objects (rows)
    fileName?: string;      // Optional file name
};

type AnyType = string | number | undefined | null | object;

const ExportToExcel = ({ data, fileName = "data.xlsx" }: ExcelProps) => {
    const columnMap: Record<string, string> = {
        id: "ID",
        application_type: "Ariza turi",
        submit_as: "Topshiruvchi",
        status: "Holati",
        rejected_reason: "Rad etish sababi",
        name: "Loyiha nomi",
        category: "Kategoriya",
        short_description: "Qisqacha ta'rif",
        problem_and_solution: "Muammo va yechim",
        from_military: "Harbiydan",
        average_grade_str: "O‘rtacha ball",
        user: "Foydalanuvchi ID",
        user_pinfl: "JShShIR",
        user_full_name: "F.I.Sh.",
        expert_data: "Ekspert maʼlumoti",
    };

    // ✅ 3. Maʼlumotni nusxa qilib, statusni va headerlarni o‘zgartirish
    const transformedData = data.map((row) => {
        const newRow: Record<string, AnyType> = {};
        Object.entries(row).forEach(([key, value]) => {
            const newKey = columnMap[key] || key;
            // Statusni o‘zgartirish
            if (key === "status") {
                value = getApplicationStatusName(value) || value;
            } else if (key === "submit_as") {
                value = getRoleName(value) || value
            } else if (key === "expert_data") {
                value = value?.full_name;
            } else if (key === "application_type") {
                value = getApplicationChoiceName(value) || value;
            } else if (key === "from_military") {
                value = value ? "Ha" : "Yo'q";
            }
            newRow[newKey] = value;
        })
        return newRow;
    });

    const exportFile = () => {
        // Convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(transformedData);

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Arizalar");

        // Generate buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Save the file
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, fileName);
    };

    return (
        <Button variant="outlined" color="primary" onClick={exportFile} icon={<DownloadOutlined />}>
            Jadvalni yuklab olish
        </Button>
    );
}

export default ExportToExcel