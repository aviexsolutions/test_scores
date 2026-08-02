using System;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace TestScoresApp
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }

    public class MainForm : Form
    {
        private TextBox txtInput;
        private Button btnCalculate;
        private Button btnClear;
        private Label lblScoresList;
        private Label lblLowScore;
        private Label lblHighScore;
        private Label lblAvgScore;

        public MainForm()
        {
            InitializeComponents();
        }

        private void InitializeComponents()
        {
            Text = "Test Scores";
            Size = new Size(620, 380);
            StartPosition = FormStartPosition.CenterScreen;
            BackColor = Color.FromArgb(245, 250, 255);

            var title = new Label()
            {
                Text = "Test Scores",
                Font = new Font("Segoe UI", 18, FontStyle.Bold),
                AutoSize = true,
                Location = new Point(18, 14)
            };

            var subtitle = new Label()
            {
                Text = "Enter comma-separated test scores then click Calculate.",
                Font = new Font("Segoe UI", 9F, FontStyle.Regular),
                AutoSize = true,
                ForeColor = Color.DimGray,
                Location = new Point(20, 50)
            };

            txtInput = new TextBox()
            {
                Location = new Point(20, 80),
                Width = 420,
                Font = new Font("Segoe UI", 10F),
                Text = "e.g. 78, 92.5, 84, 100",
                ForeColor = Color.Gray
            };
            txtInput.GotFocus += (s, e) => {
                if (txtInput.ForeColor == Color.Gray)
                {
                    txtInput.Text = string.Empty;
                    txtInput.ForeColor = Color.Black;
                }
            };
            txtInput.LostFocus += (s, e) => {
                if (string.IsNullOrWhiteSpace(txtInput.Text))
                {
                    txtInput.Text = "e.g. 78, 92.5, 84, 100";
                    txtInput.ForeColor = Color.Gray;
                }
            };

            btnCalculate = new Button()
            {
                Text = "Calculate",
                Location = new Point(450, 78),
                Size = new Size(120, 30),
                BackColor = Color.FromArgb(37, 99, 235),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat
            };
            btnCalculate.FlatAppearance.BorderSize = 0;
            btnCalculate.Click += BtnCalculate_Click;

            btnClear = new Button()
            {
                Text = "Clear",
                Location = new Point(450, 116),
                Size = new Size(120, 30),
                BackColor = Color.FromArgb(220, 230, 255),
                ForeColor = Color.Black,
                FlatStyle = FlatStyle.Flat
            };
            btnClear.FlatAppearance.BorderSize = 0;
            btnClear.Click += BtnClear_Click;

            var panel = new Panel()
            {
                Location = new Point(18, 160),
                Size = new Size(560, 170),
                BackColor = Color.White,
                BorderStyle = BorderStyle.FixedSingle
            };

            var lbl1 = new Label() { Text = "Scores:", Location = new Point(12, 12), AutoSize = true, Font = new Font("Segoe UI", 10F, FontStyle.Regular) };
            lblScoresList = new Label() { Text = "", Location = new Point(100, 12), AutoSize = true, MaximumSize = new Size(430, 0), Font = new Font("Segoe UI", 10F, FontStyle.Regular) };

            var lbl2 = new Label() { Text = "Low Score:", Location = new Point(12, 48), AutoSize = true, Font = new Font("Segoe UI", 10F, FontStyle.Regular) };
            lblLowScore = new Label() { Text = "", Location = new Point(100, 48), AutoSize = true, Font = new Font("Segoe UI", 10F, FontStyle.Bold) };

            var lbl3 = new Label() { Text = "High Score:", Location = new Point(12, 82), AutoSize = true, Font = new Font("Segoe UI", 10F, FontStyle.Regular) };
            lblHighScore = new Label() { Text = "", Location = new Point(100, 82), AutoSize = true, Font = new Font("Segoe UI", 10F, FontStyle.Bold) };

            var lbl4 = new Label() { Text = "Average:", Location = new Point(12, 116), AutoSize = true, Font = new Font("Segoe UI", 10F, FontStyle.Regular) };
            lblAvgScore = new Label() { Text = "", Location = new Point(100, 116), AutoSize = true, Font = new Font("Segoe UI", 10F, FontStyle.Bold) };

            panel.Controls.AddRange(new Control[] { lbl1, lblScoresList, lbl2, lblLowScore, lbl3, lblHighScore, lbl4, lblAvgScore });

            Controls.AddRange(new Control[] { title, subtitle, txtInput, btnCalculate, btnClear, panel });
        }

        private void BtnClear_Click(object sender, EventArgs e)
        {
            txtInput.Text = string.Empty;
            lblScoresList.Text = string.Empty;
            lblLowScore.Text = string.Empty;
            lblHighScore.Text = string.Empty;
            lblAvgScore.Text = string.Empty;
        }

        private void BtnCalculate_Click(object sender, EventArgs e)
        {
            string userInput = txtInput.Text;
            if (string.IsNullOrWhiteSpace(userInput))
            {
                MessageBox.Show("No scores were entered.", "Info", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            double[] scores;
            try
            {
                scores = ParseScores(userInput);
            }
            catch
            {
                MessageBox.Show("Please enter valid numbers separated by commas.", "Input Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            double low = scores.Min();
            double high = scores.Max();
            double average = CalculateAverage(scores);

            DisplayResults(scores, low, high, average);
        }

        private double[] ParseScores(string input)
        {
            return input.Split(',')
                        .Select(s => double.Parse(s.Trim()))
                        .ToArray();
        }

        private double CalculateAverage(double[] scores)
        {
            if (scores.Length == 0) return 0.0;
            double sum = scores.Sum();
            return Math.Round(sum / scores.Length, 1);
        }

        private void DisplayResults(double[] scores, double low, double high, double avg)
        {
            lblScoresList.Text = string.Join(", ", scores.Select(s => s.ToString("0.#")));
            lblLowScore.Text = low.ToString("0.#");
            lblHighScore.Text = high.ToString("0.#");
            lblAvgScore.Text = avg.ToString("0.0");
        }
    }
}
