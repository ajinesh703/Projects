import tkinter as tk
from tkinter import ttk, messagebox

# Seed database (hardcoded)
seed_data = {
    "Rice": {
        "Kharif": {
            "North India": "Pusa Basmati 1",
            "South India": "IR64",
            "East India": "Swarna Sub1",
            "West India": "MTU1010"
        },
        "Rabi": {
            "North India": "PR 126",
            "South India": "ADT 37",
            "East India": "CR Dhan 110",
            "West India": "Jaya"
        }
    },
    "Wheat": {
        "Kharif": {
            "North India": "WHD 943",
            "South India": "GW 273",
            "East India": "HD 2987",
            "West India": "HI 1563"
        },
        "Rabi": {
            "North India": "HD 2967",
            "South India": "MACS 6478",
            "East India": "PBW 343",
            "West India": "Lok 1"
        }
    },
    "Maize": {
        "Kharif": {
            "North India": "Bio 9681",
            "South India": "Nityashree",
            "East India": "DHM 117",
            "West India": "Pioneer 30V92"
        },
        "Rabi": {
            "North India": "HQPM 1",
            "South India": "Rasi 4212",
            "East India": "Suwan 1",
            "West India": "Sanket 512"
        }
    }
}

# GUI Application
def create_gui():
    def get_recommendation():
        crop = crop_var.get()
        season = season_var.get()
        region = region_var.get()

        if crop and season and region:
            try:
                seed = seed_data[crop][season][region]
                result_label.config(
                    text=f"? Recommended Seed: {seed}",
                    fg="green"
                )
            except KeyError:
                result_label.config(
                    text="?? No data found for this selection.",
                    fg="orange"
                )
        else:
            messagebox.showwarning("Missing Selection", "Please select all options.")

    # Main window
    window = tk.Tk()
    window.title("Seed Selection Helper")
    window.geometry("400x400")
    window.configure(bg="#f3f9f4")

    tk.Label(window, text="?? Seed Selection Helper", font=("Helvetica", 16, "bold"), bg="#f3f9f4", fg="#2c662d").pack(pady=10)

    # Dropdown variables
    crop_var = tk.StringVar()
    season_var = tk.StringVar()
    region_var = tk.StringVar()

    # Dropdowns
    def make_dropdown(label_text, options, variable):
        frame = tk.Frame(window, bg="#f3f9f4")
        tk.Label(frame, text=label_text, font=("Helvetica", 12), bg="#f3f9f4").pack(anchor="w")
        combo = ttk.Combobox(frame, textvariable=variable, values=options, state="readonly")
        combo.pack(fill="x", pady=5)
        frame.pack(fill="x", padx=20, pady=5)

    make_dropdown("Select Crop:", list(seed_data.keys()), crop_var)
    make_dropdown("Select Season:", ["Kharif", "Rabi"], season_var)
    make_dropdown("Select Region:", ["North India", "South India", "East India", "West India"], region_var)

    # Button
    tk.Button(window, text="Get Recommended Seed", command=get_recommendation, bg="#4CAF50", fg="white", font=("Helvetica", 12, "bold")).pack(pady=10)

    # Result label
    result_label = tk.Label(window, text="", font=("Helvetica", 12), bg="#f3f9f4")
    result_label.pack(pady=20)

    window.mainloop()

create_gui()
