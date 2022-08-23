package Oraren;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;
import java.awt.Color;
import javax.swing.JLabel;
import java.awt.GridLayout;
import java.awt.Font;
import javax.swing.JButton;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.awt.event.ActionEvent;
import Program.*;
import javax.swing.JScrollPane;
import javax.swing.JTabbedPane;
import javax.swing.SwingConstants;
import javax.swing.JTextField;
import javax.swing.JTextArea;
import Program.*;

public class Timetable extends JFrame {

	private JPanel contentPane;
	private Het[] Ahet = new Het[11];
	private Het[] Bhet = new Het[11];
	private int hettipusValtozo;
	private String felsoCim;

	public Timetable(int ht) {
		super("MU TCM: Órarend");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 800, 500);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		hettipusValtozo = ht;
		for(int i = 0; i < Ahet.length; i++) {
			Het hetAAlap = new Het();
			Het hetBAlap = new Het();
			Ahet[i] = hetAAlap;
			Bhet[i] = hetBAlap;
			Ahet[i].setHetfo("-", "-", "-");
			Ahet[i].setKedd("-", "-", "-");
			Ahet[i].setSzerda("-", "-", "-");
			Ahet[i].setCsutortok("-", "-", "-");
			Ahet[i].setPentek("-", "-", "-");
			Bhet[i].setHetfo("-", "-", "-");
			Bhet[i].setKedd("-", "-", "-");
			Bhet[i].setSzerda("-", "-", "-");
			Bhet[i].setCsutortok("-", "-", "-");
			Bhet[i].setPentek("-", "-", "-");
		}
		if(hettipusValtozo == 1) {
			felsoCim = "A hét";
		}else if(hettipusValtozo == 2) {
			felsoCim = "B hét";
		}
		FileManager.orarendBeolvas("Data\\Ahet.txt", Ahet);
		FileManager.orarendBeolvas("Data\\Bhet.txt", Bhet);

		setContentPane(contentPane);
		contentPane.setLayout(new BorderLayout(0, 0));
		
		JPanel FelsoPanel = new JPanel();
		FelsoPanel.setBackground(new Color(128, 128, 255));
		contentPane.add(FelsoPanel, BorderLayout.NORTH);
		FelsoPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		JLabel lblOrarend = new JLabel("Óraren "+felsoCim);
		lblOrarend.setFont(new Font("Tahoma", Font.PLAIN, 20));
		FelsoPanel.add(lblOrarend);
		
		JPanel KozepsoPanel = new JPanel();
		KozepsoPanel.setBackground(new Color(200, 210, 156));
		contentPane.add(KozepsoPanel, BorderLayout.CENTER);
		KozepsoPanel.setLayout(new BorderLayout(0, 0));
		
		JPanel NapokNevePanel = new JPanel();
		NapokNevePanel.setBackground(new Color(200, 210, 156));
		KozepsoPanel.add(NapokNevePanel, BorderLayout.NORTH);
		NapokNevePanel.setLayout(new BorderLayout(0, 0));
		
		JPanel NapokNeveBaloldal = new JPanel();
		NapokNevePanel.add(NapokNeveBaloldal, BorderLayout.WEST);
		
		JPanel NapokNeveKozep = new JPanel();
		NapokNevePanel.add(NapokNeveKozep, BorderLayout.CENTER);
		NapokNeveKozep.setLayout(new GridLayout(0, 5, 0, 0));
		
		JLabel lblHétfõ = new JLabel("Hétfõ");
		lblHétfõ.setHorizontalAlignment(SwingConstants.CENTER);
		NapokNeveKozep.add(lblHétfõ);
		
		JLabel lblKedd = new JLabel("Kedd");
		lblKedd.setHorizontalAlignment(SwingConstants.CENTER);
		NapokNeveKozep.add(lblKedd);
		
		JLabel lblSzerda = new JLabel("Szerda");
		lblSzerda.setHorizontalAlignment(SwingConstants.CENTER);
		NapokNeveKozep.add(lblSzerda);
		
		JLabel lblCstrtk = new JLabel("Csütörtök");
		lblCstrtk.setHorizontalAlignment(SwingConstants.CENTER);
		NapokNeveKozep.add(lblCstrtk);
		
		JLabel lblPntek = new JLabel("Péntek");
		lblPntek.setHorizontalAlignment(SwingConstants.CENTER);
		NapokNeveKozep.add(lblPntek);
		
		JPanel OrakSzamaPanel = new JPanel();
		OrakSzamaPanel.setBounds(96, 37, 95, 310);
		KozepsoPanel.add(OrakSzamaPanel, BorderLayout.WEST);
		OrakSzamaPanel.setLayout(new GridLayout(0, 1, 0, 0));
		
		JLabel lbl8ora = new JLabel("8");
		OrakSzamaPanel.add(lbl8ora);
		lbl8ora.setHorizontalAlignment(SwingConstants.CENTER);
		
		JLabel lbl9ora = new JLabel("9");
		lbl9ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl9ora);
		
		JLabel lbl10ora = new JLabel("10");
		lbl10ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl10ora);
		
		JLabel lbl11ora = new JLabel("11");
		lbl11ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl11ora);
		
		JLabel lbl12ora = new JLabel("12");
		lbl12ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl12ora);
		
		JLabel lbl13ora = new JLabel("13");
		lbl13ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl13ora);
		
		JLabel lbl14ora = new JLabel("14");
		lbl14ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl14ora);
		
		JLabel lbl15ora = new JLabel("15");
		lbl15ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl15ora);
		
		JLabel lbl16ora = new JLabel("16");
		lbl16ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl16ora);
		
		JLabel lbl17ora = new JLabel("17");
		lbl17ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl17ora);
		
		JLabel lbl18ora = new JLabel("18");
		lbl18ora.setHorizontalAlignment(SwingConstants.CENTER);
		OrakSzamaPanel.add(lbl18ora);
		
		
		JPanel OrakPanel = new JPanel();
		KozepsoPanel.add(OrakPanel, BorderLayout.CENTER);
		OrakPanel.setLayout(new GridLayout(0, 5, 0, 0));
		
		JTextArea textH8 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 0));
		textH8.setBackground(new Color(255, 248, 220));
		textH8.setEditable(false);
		textH8.setFont(new Font("Tahoma", Font.PLAIN, 14));
		OrakPanel.add(textH8);
		
		JTextArea textK8 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 0));
		textK8.setBackground(new Color(173, 216, 230));
		textK8.setEditable(false);
		textK8.setFont(new Font("Tahoma", Font.PLAIN, 14));
		OrakPanel.add(textK8);
		
		JTextArea textSz8 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 0));
		textSz8.setBackground(new Color(255, 248, 220));
		textSz8.setEditable(false);
		textSz8.setFont(new Font("Tahoma", Font.PLAIN, 14));
		OrakPanel.add(textSz8);
		
		JTextArea textCs8 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 0));
		textCs8.setBackground(new Color(173, 216, 230));
		textCs8.setEditable(false);
		textCs8.setFont(new Font("Tahoma", Font.PLAIN, 14));
		OrakPanel.add(textCs8);
		
		JTextArea textP8 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 0));
		textP8.setBackground(new Color(255, 248, 220));
		textP8.setEditable(false);
		textP8.setFont(new Font("Tahoma", Font.PLAIN, 14));
		OrakPanel.add(textP8);
		
		JTextArea textH9 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 1));
		textH9.setBackground(new Color(173, 216, 230));
		textH9.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH9.setEditable(false);
		OrakPanel.add(textH9);
		
		JTextArea textK9 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 1));
		textK9.setBackground(new Color(255, 248, 220));
		textK9.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK9.setEditable(false);
		OrakPanel.add(textK9);
		
		JTextArea textSz9 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 1));
		textSz9.setBackground(new Color(173, 216, 230));
		textSz9.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz9.setEditable(false);
		OrakPanel.add(textSz9);
		
		JTextArea textCs9 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 1));
		textCs9.setBackground(new Color(255, 248, 220));
		textCs9.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs9.setEditable(false);
		OrakPanel.add(textCs9);
		
		JTextArea textP9 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 1));
		textP9.setBackground(new Color(173, 216, 230));
		textP9.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP9.setEditable(false);
		OrakPanel.add(textP9);
		
		JTextArea textH10 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 2));
		textH10.setBackground(new Color(255, 248, 220));
		textH10.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH10.setEditable(false);
		OrakPanel.add(textH10);
		
		JTextArea textK10 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 2));
		textK10.setBackground(new Color(173, 216, 230));
		textK10.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK10.setEditable(false);
		OrakPanel.add(textK10);
		
		JTextArea textSz10 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 2));
		textSz10.setBackground(new Color(255, 248, 220));
		textSz10.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz10.setEditable(false);
		OrakPanel.add(textSz10);
		
		JTextArea textCs10 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 2));
		textCs10.setBackground(new Color(173, 216, 230));
		textCs10.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs10.setEditable(false);
		OrakPanel.add(textCs10);
		
		JTextArea textP10 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 2));
		textP10.setBackground(new Color(255, 248, 220));
		textP10.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP10.setEditable(false);
		OrakPanel.add(textP10);
		
		JTextArea textH11 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 3));
		textH11.setBackground(new Color(173, 216, 230));
		textH11.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH11.setEditable(false);
		OrakPanel.add(textH11);
		
		JTextArea textK11 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 3));
		textK11.setBackground(new Color(255, 248, 220));
		textK11.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK11.setEditable(false);
		OrakPanel.add(textK11);
		
		JTextArea textSz11 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 3));
		textSz11.setBackground(new Color(173, 216, 230));
		textSz11.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz11.setEditable(false);
		OrakPanel.add(textSz11);
		
		JTextArea textCs11 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 3));
		textCs11.setBackground(new Color(255, 248, 220));
		textCs11.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs11.setEditable(false);
		OrakPanel.add(textCs11);
		
		JTextArea textP11 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 3));
		textP11.setBackground(new Color(173, 216, 230));
		textP11.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP11.setEditable(false);
		OrakPanel.add(textP11);
		
		JTextArea textH12 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 4));
		textH12.setBackground(new Color(255, 248, 220));
		textH12.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH12.setEditable(false);
		OrakPanel.add(textH12);
		
		JTextArea textK12 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 4));
		textK12.setBackground(new Color(173, 216, 230));
		textK12.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK12.setEditable(false);
		OrakPanel.add(textK12);
		
		JTextArea textSz12 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 4));
		textSz12.setBackground(new Color(255, 248, 220));
		textSz12.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz12.setEditable(false);
		OrakPanel.add(textSz12);
		
		JTextArea textCs12 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 4));
		textCs12.setBackground(new Color(173, 216, 230));
		textCs12.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs12.setEditable(false);
		OrakPanel.add(textCs12);
		
		JTextArea textP12 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 4));
		textP12.setBackground(new Color(255, 248, 220));
		textP12.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP12.setEditable(false);
		OrakPanel.add(textP12);
		
		JTextArea textH13 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 5));
		textH13.setBackground(new Color(173, 216, 230));
		textH13.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH13.setEditable(false);
		OrakPanel.add(textH13);
		
		JTextArea textK13 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 5));
		textK13.setBackground(new Color(255, 248, 220));
		textK13.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK13.setEditable(false);
		OrakPanel.add(textK13);
		
		JTextArea textSz13 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 5));
		textSz13.setBackground(new Color(173, 216, 230));
		textSz13.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz13.setEditable(false);
		OrakPanel.add(textSz13);
		
		JTextArea textCs13 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 5));
		textCs13.setBackground(new Color(255, 248, 220));
		textCs13.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs13.setEditable(false);
		OrakPanel.add(textCs13);
		
		JTextArea textP13 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 5));
		textP13.setBackground(new Color(173, 216, 230));
		textP13.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP13.setEditable(false);
		OrakPanel.add(textP13);
		
		JTextArea textH14 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 6));
		textH14.setBackground(new Color(255, 248, 220));
		textH14.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH14.setEditable(false);
		OrakPanel.add(textH14);
		
		JTextArea textK14 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 6));
		textK14.setBackground(new Color(173, 216, 230));
		textK14.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK14.setEditable(false);
		OrakPanel.add(textK14);
		
		JTextArea textSz14 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 6));
		textSz14.setBackground(new Color(255, 248, 220));
		textSz14.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz14.setEditable(false);
		OrakPanel.add(textSz14);
		
		JTextArea textCs14 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 6));
		textCs14.setBackground(new Color(173, 216, 230));
		textCs14.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs14.setEditable(false);
		OrakPanel.add(textCs14);
		
		JTextArea textP14 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 6));
		textP14.setBackground(new Color(255, 248, 220));
		textP14.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP14.setEditable(false);
		OrakPanel.add(textP14);
		
		JTextArea textH15 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 7));
		textH15.setBackground(new Color(173, 216, 230));
		textH15.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH15.setEditable(false);
		OrakPanel.add(textH15);
		
		JTextArea textK15 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 7));
		textK15.setBackground(new Color(255, 248, 220));
		textK15.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK15.setEditable(false);
		OrakPanel.add(textK15);
		
		JTextArea textSz15 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 7));
		textSz15.setBackground(new Color(173, 216, 230));
		textSz15.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz15.setEditable(false);
		OrakPanel.add(textSz15);
		
		JTextArea textCs15 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 7));
		textCs15.setBackground(new Color(255, 248, 220));
		textCs15.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs15.setEditable(false);
		OrakPanel.add(textCs15);
		
		JTextArea textP15 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 7));
		textP15.setBackground(new Color(173, 216, 230));
		textP15.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP15.setEditable(false);
		OrakPanel.add(textP15);
		
		JTextArea textH16 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 8));
		textH16.setBackground(new Color(255, 248, 220));
		textH16.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH16.setEditable(false);
		OrakPanel.add(textH16);
		
		JTextArea textK16 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 8));
		textK16.setBackground(new Color(173, 216, 230));
		textK16.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK16.setEditable(false);
		OrakPanel.add(textK16);
		
		JTextArea textSz16 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 8));
		textSz16.setBackground(new Color(255, 248, 220));
		textSz16.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz16.setEditable(false);
		OrakPanel.add(textSz16);
		
		JTextArea textCs16 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 8));
		textCs16.setBackground(new Color(173, 216, 230));
		textCs16.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs16.setEditable(false);
		OrakPanel.add(textCs16);
		
		JTextArea textP16 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 8));
		textP16.setBackground(new Color(255, 248, 220));
		textP16.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP16.setEditable(false);
		OrakPanel.add(textP16);
		
		JTextArea textH17 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 9));
		textH17.setBackground(new Color(173, 216, 230));
		textH17.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH17.setEditable(false);
		OrakPanel.add(textH17);
		
		JTextArea textK17 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 9));
		textK17.setBackground(new Color(255, 248, 220));
		textK17.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK17.setEditable(false);
		OrakPanel.add(textK17);
		
		JTextArea textSz17 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 9));
		textSz17.setBackground(new Color(173, 216, 230));
		textSz17.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz17.setEditable(false);
		OrakPanel.add(textSz17);
		
		JTextArea textCs17 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 9));
		textCs17.setBackground(new Color(255, 248, 220));
		textCs17.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs17.setEditable(false);
		OrakPanel.add(textCs17);
		
		JTextArea textP17 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 9));
		textP17.setBackground(new Color(173, 216, 230));
		textP17.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP17.setEditable(false);
		OrakPanel.add(textP17);
		
		JTextArea textH18 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 1, 10));
		textH18.setBackground(new Color(255, 248, 220));
		textH18.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textH18.setEditable(false);
		OrakPanel.add(textH18);
		
		JTextArea textK18 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 2, 10));
		textK18.setBackground(new Color(173, 216, 230));
		textK18.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textK18.setEditable(false);
		OrakPanel.add(textK18);
		
		JTextArea textSz18 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 3, 10));
		textSz18.setBackground(new Color(255, 248, 220));
		textSz18.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textSz18.setEditable(false);
		OrakPanel.add(textSz18);
		
		JTextArea textCs18 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 4, 10));
		textCs18.setBackground(new Color(173, 216, 230));
		textCs18.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCs18.setEditable(false);
		OrakPanel.add(textCs18);
		
		JTextArea textP18 = new JTextArea(orarendFeltolto(Ahet, Bhet, hettipusValtozo, 5, 10));
		textP18.setBackground(new Color(255, 248, 220));
		textP18.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textP18.setEditable(false);
		OrakPanel.add(textP18);
		
		JPanel AlsoPanel = new JPanel();
		AlsoPanel.setBackground(new Color(255, 128, 128));
		contentPane.add(AlsoPanel, BorderLayout.SOUTH);
		
		JButton btnMenu = new JButton("Menü");
		btnMenu.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Menu menu = new Menu();
				dispose();
				menu.setVisible(true);
			}
		});
		
		JButton btnHetValto = new JButton("Hét váltása");
		btnHetValto.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if(hettipusValtozo == 1) {
					hettipusValtozo = 2;
				}else {
					hettipusValtozo = 1;
				}
				Timetable tt = new Timetable(hettipusValtozo);
				dispose();
				tt.setVisible(true);
			}
		});
		AlsoPanel.add(btnHetValto);
		
		JButton btnSzerkesztés = new JButton("Szerkesztés");
		btnSzerkesztés.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				OrarendEditor oraE = new OrarendEditor(Ahet, Bhet, hettipusValtozo);
				dispose();
				oraE.setVisible(true);
			}
		});
		AlsoPanel.add(btnSzerkesztés);
		AlsoPanel.add(btnMenu);
		
		
	}
	
	public static String orarendFeltolto(Het[] ahet, Het[] bhet, int hettipus, int nap, int ido) {
		String szoveg = "-\n-\n-";
		if(hettipus == 1) {
			if(nap == 1) {
				szoveg = ahet[ido].getHetfo().getCim()+"\n"+ahet[ido].getHetfo().getOktato()+"\n"+ahet[ido].getHetfo().getTerem();
			}else if(nap == 2) {
				szoveg = ahet[ido].getKedd().getCim()+"\n"+ahet[ido].getKedd().getOktato()+"\n"+ahet[ido].getKedd().getTerem();
			}else if(nap == 3) {
				szoveg = ahet[ido].getSzerda().getCim()+"\n"+ahet[ido].getSzerda().getOktato()+"\n"+ahet[ido].getSzerda().getTerem();
			}else if(nap == 4) {
				szoveg = ahet[ido].getCsutortok().getCim()+"\n"+ahet[ido].getCsutortok().getOktato()+"\n"+ahet[ido].getCsutortok().getTerem();
			}else if(nap == 5) {
				szoveg = ahet[ido].getPentek().getCim()+"\n"+ahet[ido].getPentek().getOktato()+"\n"+ahet[ido].getPentek().getTerem();
			}
		}else if(hettipus == 2) {
			if(nap == 1) {
				szoveg = bhet[ido].getHetfo().getCim()+"\n"+bhet[ido].getHetfo().getOktato()+"\n"+bhet[ido].getHetfo().getTerem();
			}else if(nap == 2) {
				szoveg = bhet[ido].getKedd().getCim()+"\n"+bhet[ido].getKedd().getOktato()+"\n"+bhet[ido].getKedd().getTerem();
			}else if(nap == 3) {
				szoveg = bhet[ido].getSzerda().getCim()+"\n"+bhet[ido].getSzerda().getOktato()+"\n"+bhet[ido].getSzerda().getTerem();
			}else if(nap == 4) {
				szoveg = bhet[ido].getCsutortok().getCim()+"\n"+bhet[ido].getCsutortok().getOktato()+"\n"+bhet[ido].getCsutortok().getTerem();
			}else if(nap == 5) {
				szoveg = bhet[ido].getPentek().getCim()+"\n"+bhet[ido].getPentek().getOktato()+"\n"+bhet[ido].getPentek().getTerem();
			}
		}
		return szoveg;
	}
}
