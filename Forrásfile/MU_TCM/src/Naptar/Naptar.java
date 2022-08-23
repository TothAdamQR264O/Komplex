package Naptar;
import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.GridLayout;
import java.time.LocalDate;
import java.util.ArrayList;

import javax.swing.JLabel;
import java.awt.Color;
import javax.swing.SwingConstants;
import java.awt.BorderLayout;
import java.awt.Font;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.sql.DataTruncation;
import java.awt.event.ActionEvent;
import Program.*;

public class Naptar extends JFrame {

	private JPanel contentPane;
	private final JPanel AlsoPanel = new JPanel();
	private ArrayList<Naptar_bejegyzes> BLista = new ArrayList<>();
	private LocalDate dateTime = LocalDate.now();

	public Naptar(NaptarStruktura napS) {
		super("MU TCM: Naptár");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 800, 500);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setExtendedState(JFrame.MAXIMIZED_BOTH);
		
		NaptarStruktura NS = napS;
		int[] napok = new int[42];
		int[] uzistszam = new int[42];
		Color[] szin = new Color[42];
		String[] cimek = new String[42];
		FileManager.NaptarListaBeolvas("Data\\calendarlist.csv", BLista);
		for(int i = 0; i < szin.length; i++) {
			szin[i] = Color.BLACK;
			cimek[i] = "-";
		}
		
		napok[NS.getMeilykNap()] = 1;
		
		napokfeltoltese(napok, NS);
		nemHonapSzine(napok, szin, NS);
		aktualis_nap_szine(napok, szin, dateTime, NS);
		
		cimekfeltoltese(BLista, napok, cimek, uzistszam, NS);

		setContentPane(contentPane);
		contentPane.setLayout(new BorderLayout(0, 0));
		
		JPanel FelsoPanel = new JPanel();
		FelsoPanel.setBackground(new Color(128, 128, 255));
		contentPane.add(FelsoPanel);
		FelsoPanel.setLayout(new GridLayout(1, 0, 0, 0));
		
		JLabel EvLable = new JLabel("Év: "+NS.getEv());
		EvLable.setFont(new Font("Tahoma", Font.PLAIN, 15));
		EvLable.setHorizontalAlignment(SwingConstants.CENTER);
		FelsoPanel.add(EvLable);
		
		JButton btnHonapVisz = new JButton("<");
		btnHonapVisz.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				honapvalta(-1, napok, NS, szin, cimek, BLista, dateTime);
				Naptar naptar = new Naptar(NS);
				dispose();
				naptar.setVisible(true);
			}
		});
		FelsoPanel.add(btnHonapVisz);
		
		JLabel HonapLabel = new JLabel("Hónap: "+honapneve(NS));
		HonapLabel.setFont(new Font("Tahoma", Font.PLAIN, 15));
		HonapLabel.setHorizontalAlignment(SwingConstants.CENTER);
		FelsoPanel.add(HonapLabel);
		
		JButton btnHonapElo = new JButton(">");
		btnHonapElo.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				honapvalta(1, napok, NS, szin, cimek, BLista, dateTime);
				Naptar naptar = new Naptar(NS);
				dispose();
				naptar.setVisible(true);
			}
		});
		FelsoPanel.add(btnHonapElo);
		
		JPanel KozepsoPanel = new JPanel();
		KozepsoPanel.setBackground(new Color(226, 210, 156));
		contentPane.add(KozepsoPanel);
		KozepsoPanel.setLayout(new GridLayout(0, 7, 0, 0));
		
		JLabel IblHetfo = new JLabel("Hétfõ");
		IblHetfo.setForeground(new Color(0, 0, 0));
		IblHetfo.setHorizontalAlignment(SwingConstants.CENTER);
		KozepsoPanel.add(IblHetfo);
		
		JLabel IblKedd = new JLabel("Kedd");
		IblKedd.setHorizontalAlignment(SwingConstants.CENTER);
		IblKedd.setForeground(Color.BLACK);
		KozepsoPanel.add(IblKedd);
		
		JLabel lblSzerda = new JLabel("Szerda");
		lblSzerda.setHorizontalAlignment(SwingConstants.CENTER);
		lblSzerda.setForeground(Color.BLACK);
		KozepsoPanel.add(lblSzerda);
		
		JLabel IblCsutortok = new JLabel("Csütörtök");
		IblCsutortok.setHorizontalAlignment(SwingConstants.CENTER);
		IblCsutortok.setForeground(Color.BLACK);
		KozepsoPanel.add(IblCsutortok);
		
		JLabel lblPentek = new JLabel("Péntek");
		lblPentek.setHorizontalAlignment(SwingConstants.CENTER);
		lblPentek.setForeground(Color.BLACK);
		KozepsoPanel.add(lblPentek);
		
		JLabel lblSzombat = new JLabel("Szombat");
		lblSzombat.setHorizontalAlignment(SwingConstants.CENTER);
		lblSzombat.setForeground(Color.BLACK);
		KozepsoPanel.add(lblSzombat);
		
		JLabel lblVasarnap = new JLabel("Vasárnap");
		lblVasarnap.setHorizontalAlignment(SwingConstants.CENTER);
		lblVasarnap.setForeground(Color.BLACK);
		KozepsoPanel.add(lblVasarnap);
		
		JLabel Ibl1 = new JLabel(""+napok[0]);
		Ibl1.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl1.setForeground(szin[0]);
		KozepsoPanel.add(Ibl1);
		
		JLabel Ibl2 = new JLabel(""+napok[1]);
		Ibl2.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl2.setForeground(szin[1]);
		KozepsoPanel.add(Ibl2);
		
		JLabel lbl3 = new JLabel(""+napok[2]);
		lbl3.setHorizontalAlignment(SwingConstants.CENTER);
		lbl3.setForeground(szin[2]);
		KozepsoPanel.add(lbl3);
		
		JLabel Ibl4 = new JLabel(""+napok[3]);
		Ibl4.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl4.setForeground(szin[3]);
		KozepsoPanel.add(Ibl4);
		
		JLabel lbl5 = new JLabel(""+napok[4]);
		lbl5.setHorizontalAlignment(SwingConstants.CENTER);
		lbl5.setForeground(szin[4]);
		KozepsoPanel.add(lbl5);
		
		JLabel lbl6 = new JLabel(""+napok[5]);
		lbl6.setHorizontalAlignment(SwingConstants.CENTER);
		lbl6.setForeground(szin[5]);
		KozepsoPanel.add(lbl6);
		
		JLabel lbl7 = new JLabel(""+napok[6]);
		lbl7.setHorizontalAlignment(SwingConstants.CENTER);
		lbl7.setForeground(szin[6]);
		KozepsoPanel.add(lbl7);
		
		JButton btn1 = new JButton(cimek[0]);
		btn1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[0], uzistszam[0], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 0, NS), ""+napok[0]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn1);
		
		JButton btn2 = new JButton(cimek[1]);
		btn2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[1], uzistszam[1], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 1, NS), ""+napok[1]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn2);
		
		JButton btn3 = new JButton(cimek[2]);
		btn3.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[2], uzistszam[2], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 2, NS), ""+napok[2]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn3);
		
		JButton btn4 = new JButton(cimek[3]);
		btn4.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[3], uzistszam[3], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 3, NS), ""+napok[3]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn4);
		
		JButton btn5 = new JButton(cimek[4]);
		btn5.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[4], uzistszam[4], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 4, NS), ""+napok[4]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn5);
		
		JButton btn6 = new JButton(cimek[5]);
		btn6.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[5], uzistszam[5], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 5, NS), ""+napok[5]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn6);
		
		JButton btn7 = new JButton(cimek[6]);
		btn7.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[6], uzistszam[6], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 6, NS), ""+napok[6]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn7);
		
		JLabel Ibl8 = new JLabel(""+napok[7]);
		Ibl8.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl8.setForeground(szin[7]);
		KozepsoPanel.add(Ibl8);
		
		JLabel Ibl9 = new JLabel(""+napok[8]);
		Ibl9.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl9.setForeground(szin[8]);
		KozepsoPanel.add(Ibl9);
		
		JLabel lbl10 = new JLabel(""+napok[9]);
		lbl10.setHorizontalAlignment(SwingConstants.CENTER);
		lbl10.setForeground(szin[9]);
		KozepsoPanel.add(lbl10);
		
		JLabel Ibl11 = new JLabel(""+napok[10]);
		Ibl11.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl11.setForeground(szin[10]);
		KozepsoPanel.add(Ibl11);
		
		JLabel lbl12 = new JLabel(""+napok[11]);
		lbl12.setHorizontalAlignment(SwingConstants.CENTER);
		lbl12.setForeground(szin[11]);
		KozepsoPanel.add(lbl12);
		
		JLabel lbl13 = new JLabel(""+napok[12]);
		lbl13.setHorizontalAlignment(SwingConstants.CENTER);
		lbl13.setForeground(szin[12]);
		KozepsoPanel.add(lbl13);
		
		JLabel lbl14 = new JLabel(""+napok[13]);
		lbl14.setHorizontalAlignment(SwingConstants.CENTER);
		lbl14.setForeground(szin[13]);
		KozepsoPanel.add(lbl14);
		
		JButton btn8 = new JButton(cimek[7]);
		btn8.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[7], uzistszam[7], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 7, NS), ""+napok[7]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn8);
		
		JButton btn9 = new JButton(cimek[8]);
		btn9.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[8], uzistszam[8], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 8, NS), ""+napok[8]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn9);
		
		JButton btn10 = new JButton(cimek[9]);
		btn10.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[9], uzistszam[9], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 9, NS), ""+napok[9]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn10);
		
		JButton btn11 = new JButton(cimek[10]);
		btn11.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[10], uzistszam[10], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 10, NS), ""+napok[10]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn11);
		
		JButton btn12 = new JButton(cimek[11]);
		btn12.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[11], uzistszam[11], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 11, NS), ""+napok[11]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn12);
		
		JButton btn13 = new JButton(cimek[12]);
		btn13.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[12], uzistszam[12], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 12, NS), ""+napok[12]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn13);
		
		JButton btn14 = new JButton(cimek[13]);
		btn14.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[13], uzistszam[13], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 13, NS), ""+napok[13]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn14);
		
		JLabel Ibl15 = new JLabel(""+napok[14]);
		Ibl15.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl15.setForeground(szin[14]);
		KozepsoPanel.add(Ibl15);
		
		JLabel Ibl16 = new JLabel(""+napok[15]);
		Ibl16.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl16.setForeground(szin[15]);
		KozepsoPanel.add(Ibl16);
		
		JLabel lbl17 = new JLabel(""+napok[16]);
		lbl17.setHorizontalAlignment(SwingConstants.CENTER);
		lbl17.setForeground(szin[16]);
		KozepsoPanel.add(lbl17);
		
		JLabel Ibl18 = new JLabel(""+napok[17]);
		Ibl18.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl18.setForeground(szin[17]);
		KozepsoPanel.add(Ibl18);
		
		JLabel lbl19 = new JLabel(""+napok[18]);
		lbl19.setHorizontalAlignment(SwingConstants.CENTER);
		lbl19.setForeground(szin[18]);
		KozepsoPanel.add(lbl19);
		
		JLabel lbl20 = new JLabel(""+napok[19]);
		lbl20.setHorizontalAlignment(SwingConstants.CENTER);
		lbl20.setForeground(szin[19]);
		KozepsoPanel.add(lbl20);
		
		JLabel lbl21 = new JLabel(""+napok[20]);
		lbl21.setHorizontalAlignment(SwingConstants.CENTER);
		lbl21.setForeground(szin[20]);
		KozepsoPanel.add(lbl21);
		
		JButton btn15 = new JButton(cimek[14]);
		btn15.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[14], uzistszam[14], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 14, NS), ""+napok[14]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn15);
		
		JButton btn16 = new JButton(cimek[15]);
		btn16.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[15], uzistszam[15], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 15, NS), ""+napok[15]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn16);
		
		JButton btn17 = new JButton(cimek[16]);
		btn17.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[16], uzistszam[16], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 16, NS), ""+napok[16]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn17);
		
		JButton btn18 = new JButton(cimek[17]);
		btn18.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[17], uzistszam[17], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 17, NS), ""+napok[17]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn18);
		
		JButton btn19 = new JButton(cimek[18]);
		btn19.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[18], uzistszam[18], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 18, NS), ""+napok[18]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn19);
		
		JButton btn20 = new JButton(cimek[19]);
		btn20.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[19], uzistszam[19], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 19, NS), ""+napok[19]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn20);
		
		JButton btn21 = new JButton(cimek[20]);
		btn21.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[20], uzistszam[20], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 20, NS), ""+napok[20]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn21);
		
		JLabel Ibl22 = new JLabel(""+napok[21]);
		Ibl22.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl22.setForeground(szin[21]);
		KozepsoPanel.add(Ibl22);
		
		JLabel Ibl23 = new JLabel(""+napok[22]);
		Ibl23.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl23.setForeground(szin[22]);
		KozepsoPanel.add(Ibl23);
		
		JLabel lbl24 = new JLabel(""+napok[23]);
		lbl24.setHorizontalAlignment(SwingConstants.CENTER);
		lbl24.setForeground(szin[23]);
		KozepsoPanel.add(lbl24);
		
		JLabel Ibl25 = new JLabel(""+napok[24]);
		Ibl25.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl25.setForeground(szin[24]);
		KozepsoPanel.add(Ibl25);
		
		JLabel lbl26 = new JLabel(""+napok[25]);
		lbl26.setHorizontalAlignment(SwingConstants.CENTER);
		lbl26.setForeground(szin[25]);
		KozepsoPanel.add(lbl26);
		
		JLabel lbl27 = new JLabel(""+napok[26]);
		lbl27.setHorizontalAlignment(SwingConstants.CENTER);
		lbl27.setForeground(szin[26]);
		KozepsoPanel.add(lbl27);
		
		JLabel lbl28 = new JLabel(""+napok[27]);
		lbl28.setHorizontalAlignment(SwingConstants.CENTER);
		lbl28.setForeground(szin[27]);
		KozepsoPanel.add(lbl28);
		
		JButton btn22 = new JButton(cimek[21]);
		btn22.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[21], uzistszam[21], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 21, NS), ""+napok[21]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn22);
		
		JButton btn23 = new JButton(cimek[22]);
		btn23.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[22], uzistszam[22], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 22, NS), ""+napok[22]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn23);
		
		JButton btn24 = new JButton(cimek[23]);
		btn24.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[23], uzistszam[23], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 23, NS), ""+napok[23]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn24);
		
		JButton btn25 = new JButton(cimek[24]);
		btn25.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[24], uzistszam[24], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 24, NS), ""+napok[24]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn25);
		
		JButton btn26 = new JButton(cimek[25]);
		btn26.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[25], uzistszam[25], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 25, NS), ""+napok[25]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn26);
		
		JButton btn27 = new JButton(cimek[26]);
		btn27.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[26], uzistszam[26], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 26, NS), ""+napok[26]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn27);
		
		JButton btn28 = new JButton(cimek[27]);
		btn28.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[27], uzistszam[27], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 27, NS), ""+napok[27]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn28);
		
		JLabel Ibl29 = new JLabel(""+napok[28]);
		Ibl29.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl29.setForeground(szin[28]);
		KozepsoPanel.add(Ibl29);
		
		JLabel Ibl30 = new JLabel(""+napok[29]);
		Ibl30.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl30.setForeground(szin[29]);
		KozepsoPanel.add(Ibl30);
		
		JLabel lbl31 = new JLabel(""+napok[30]);
		lbl31.setHorizontalAlignment(SwingConstants.CENTER);
		lbl31.setForeground(szin[30]);
		KozepsoPanel.add(lbl31);
		
		JLabel Ibl32 = new JLabel(""+napok[31]);
		Ibl32.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl32.setForeground(szin[31]);
		KozepsoPanel.add(Ibl32);
		
		JLabel lbl33 = new JLabel(""+napok[32]);
		lbl33.setHorizontalAlignment(SwingConstants.CENTER);
		lbl33.setForeground(szin[32]);
		KozepsoPanel.add(lbl33);
		
		JLabel lbl34 = new JLabel(""+napok[33]);
		lbl34.setHorizontalAlignment(SwingConstants.CENTER);
		lbl34.setForeground(szin[33]);
		KozepsoPanel.add(lbl34);
		
		JLabel lbl35 = new JLabel(""+napok[34]);
		lbl35.setHorizontalAlignment(SwingConstants.CENTER);
		lbl35.setForeground(szin[34]);
		KozepsoPanel.add(lbl35);
		
		JButton btn29 = new JButton(cimek[28]);
		btn29.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[28], uzistszam[28], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 28, NS), ""+napok[28]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn29);
		
		JButton btn30 = new JButton(cimek[29]);
		btn30.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[29], uzistszam[29], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 29, NS), ""+napok[29]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn30);
		
		JButton btn31 = new JButton(cimek[30]);
		btn31.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[30], uzistszam[30], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 30, NS), ""+napok[30]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn31);
		
		JButton btn32 = new JButton(cimek[31]);
		btn32.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[31], uzistszam[31], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 31, NS), ""+napok[31]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn32);
		
		JButton btn33 = new JButton(cimek[32]);
		btn33.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[32], uzistszam[32], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 32, NS), ""+napok[32]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn33);
		
		JButton btn34 = new JButton(cimek[33]);
		btn34.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[33], uzistszam[33], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 33, NS), ""+napok[33]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn34);
		
		JButton btn35 = new JButton(cimek[34]);
		btn35.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[34], uzistszam[34], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 34, NS), ""+napok[34]);
				dispose();
				naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn35);
		
		JLabel Ibl36 = new JLabel(""+napok[35]);
		Ibl36.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl36.setForeground(szin[35]);
		KozepsoPanel.add(Ibl36);
		
		JLabel Ibl37 = new JLabel(""+napok[36]);
		Ibl37.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl37.setForeground(szin[36]);
		KozepsoPanel.add(Ibl37);
		
		JLabel lbl38 = new JLabel(""+napok[37]);
		lbl38.setHorizontalAlignment(SwingConstants.CENTER);
		lbl38.setForeground(szin[37]);
		KozepsoPanel.add(lbl38);
		
		JLabel Ibl39 = new JLabel(""+napok[38]);
		Ibl39.setHorizontalAlignment(SwingConstants.CENTER);
		Ibl39.setForeground(szin[38]);
		KozepsoPanel.add(Ibl39);
		
		JLabel lbl40 = new JLabel(""+napok[39]);
		lbl40.setHorizontalAlignment(SwingConstants.CENTER);
		lbl40.setForeground(szin[39]);
		KozepsoPanel.add(lbl40);
		
		JLabel lbl41 = new JLabel(""+napok[40]);
		lbl41.setHorizontalAlignment(SwingConstants.CENTER);
		lbl41.setForeground(szin[40]);
		KozepsoPanel.add(lbl41);
		
		JLabel lbl42 = new JLabel(""+napok[41]);
		lbl42.setHorizontalAlignment(SwingConstants.CENTER);
		lbl42.setForeground(szin[41]);
		KozepsoPanel.add(lbl42);
		
		AlsoPanel.setBackground(new Color(255, 128, 128));
		contentPane.add(AlsoPanel);
		
		contentPane.add(FelsoPanel, BorderLayout.NORTH);
		contentPane.add(KozepsoPanel, BorderLayout.CENTER);
		
		JButton btn36 = new JButton(cimek[35]);
		btn36.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[35], uzistszam[35], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 35, NS), ""+napok[35]);
				dispose(); naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn36);
		
		JButton btn37 = new JButton(cimek[36]);
		btn37.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[36], uzistszam[36], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 36, NS), ""+napok[36]);
				dispose(); naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn37);
		
		JButton btn38 = new JButton(cimek[37]);
		btn38.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[37], uzistszam[37], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 37, NS), ""+napok[37]);
				dispose(); naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn38);
		
		JButton btn39 = new JButton(cimek[38]);
		btn39.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[38], uzistszam[38], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 38, NS), ""+napok[38]);
				dispose(); naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn39);
		
		JButton btn40 = new JButton(cimek[39]);
		btn40.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[39], uzistszam[39], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 39, NS), ""+napok[39]);
				dispose(); naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn40);
		
		JButton btn41 = new JButton(cimek[40]);
		btn41.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[40], uzistszam[40], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 40, NS), ""+napok[40]);
				dispose(); naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn41);
		
		JButton btn42 = new JButton(cimek[41]);
		btn42.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Esemeny naptar = new Esemeny(BLista, NS, cimek[41], uzistszam[41], ""+dateTime.getYear(), ""+honapvisszaadasa(napok, 41, NS), ""+napok[41]);
				dispose(); naptar.setVisible(true);
			}
		});
		KozepsoPanel.add(btn42);
		contentPane.add(AlsoPanel, BorderLayout.SOUTH);
		
		JButton btnMenu = new JButton("Menû");
		btnMenu.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Menu menu = new Menu();
				dispose();
				menu.setVisible(true);
			}
		});
		AlsoPanel.add(btnMenu);
		
		
	}
	
	public static String honapneve(NaptarStruktura NS) {
		String honap = "";
		String honap_szama = ""+NS.getHonap();
		
		if(honap_szama.equals("1")) {
			honap = "Január";
		}else if(honap_szama.equals("2")) {
			honap = "Február";
		}else if(honap_szama.equals("3")) {
			honap = "Március";
		}else if(honap_szama.equals("4")) {
			honap = "Április";
		}else if(honap_szama.equals("5")) {
			honap = "Május";
		}else if(honap_szama.equals("6")) {
			honap = "Június";
		}else if(honap_szama.equals("7")) {
			honap = "Július";
		}else if(honap_szama.equals("8")) {
			honap = "Agusztus";
		}else if(honap_szama.equals("9")) {
			honap = "Szeptember";
		}else if(honap_szama.equals("10")) {
			honap = "Október";
		}else if(honap_szama.equals("11")) {
			honap = "November";
		}else if(honap_szama.equals("12")) {
			honap = "December";
		}
		return honap;
	}
	
	public static void napokfeltoltese(int[] nap, NaptarStruktura NS) {
		int ho_elso_napja = NS.getMeilykNap();
		int honap = NS.getHonap();
		int szokoev = NS.getEv() % 4;
		
		/*for(int i = 0; i < nap.length; i++) {
			if(nap[i] == 1) {
				ho_elso_napja = i;
				break;
			}
		}*/
		
		for(int i = ho_elso_napja; i < nap.length; i++) {
			if(i > ho_elso_napja) {
				if(honap == 1 || honap == 3 || honap == 5 || honap == 7 || honap == 8 || honap == 10 || honap == 12) {
					if(nap[i-1] == 31) {
						nap[i] = 1;
					}else {
						nap[i] = nap[i-1] + 1;
					}
				}else if(honap == 4 || honap == 6 || honap == 9 || honap == 11) {
					if(nap[i-1] == 30) {
						nap[i] = 1;
					}else {
						nap[i] = nap[i-1] + 1;
					}
				}else if(honap == 2) {
					if(szokoev == 0) {
						if(nap[i-1] == 29) {
							nap[i] = 1;
						}else {
							nap[i] = nap[i-1] + 1;
						}
					}else {
						if(nap[i-1] == 28) {
							nap[i] = 1;
						}else {
							nap[i] = nap[i-1] + 1;
						}
					}
				}
			}else if(i == ho_elso_napja) {
				nap[i] = 1;
			}
		}
		
		if(ho_elso_napja != 0) {
			for(int i = ho_elso_napja; i > -1; i--) {
				if(i < ho_elso_napja) {
					if(nap[i+1] == 1) {
						if(honap == 1 || honap == 2 || honap == 4 || honap == 6 || honap == 8 || honap == 9 || honap == 11) {
							nap[i] = 31;
						}else if(honap == 5 || honap == 7 || honap == 10 || honap == 12) {
							nap[i] = 30;
						}else if(honap == 3) {
							if(szokoev == 0) {
								nap[i] = 29;
							}else {
								nap[i] = 28;
							}
						}
					}else {
						nap[i] = nap[i+1] - 1;
					}
				}
			}
		}
	}
	
	public static void nemHonapSzine(int[] nap, Color[] szin, NaptarStruktura NS) {
		int ho_elso_napja = NS.getMeilykNap();
		
		if(ho_elso_napja != 0) {
			for(int i = ho_elso_napja; i > -1; i--) {
				if(i < ho_elso_napja) {
					szin[i] = Color.GRAY;
				}
			}
		}
		
		int visza = nap.length;
		do {
			visza--;
			szin[visza] = Color.GRAY;
		}while(nap[visza] != 1);
	}
	
	public static void aktualis_nap_szine(int[] nap, Color[] szin, LocalDate dateTime, NaptarStruktura NS) {
		int ho_elso_napja = NS.getMeilykNap();
		int mainap = dateTime.getDayOfMonth();
		
		for(int i = 0; i < nap.length; i++) {
			if(nap[i] == 1) {
				ho_elso_napja = i;
				break;
			}
		}
		
		if(NS.getEv() == dateTime.getYear() && NS.getHonap() == dateTime.getMonthValue()) {
			for(int i = NS.getMeilykNap(); i < nap.length; i++) {
				if(nap[i] == dateTime.getDayOfMonth()) {
					szin[i] = Color.RED;
					break;
				}
			}
		}
	}
	
	public static int honapvisszaadasa(int[] nap, int gombIndex, NaptarStruktura NS) {
		int honap = 0;
		int ho_elso_napja = NS.getMeilykNap();
		int ho_utolso_napja = 0;
		
		for(int i = nap.length-1; i > 0; i--) {
			if(nap[i] == 1 && i != ho_elso_napja) {
				ho_utolso_napja = i-1;
				break;
			}
		}
		
		if(gombIndex < ho_elso_napja) {
			honap = NS.getHonap() - 1;
		}else if(gombIndex >= ho_elso_napja && gombIndex <= ho_utolso_napja) {
			honap = NS.getHonap();
		}else {
			honap = NS.getHonap() + 1;
		}
		
		return honap;
	}
	
	public static void cimekfeltoltese(ArrayList<Naptar_bejegyzes> nb, int[] nap, String[] cimek, int[] uzlisz, NaptarStruktura NS) {
		int ho_utolsoNapja = nap.length;
		int visza = nap.length;
		do {
			visza--;
			ho_utolsoNapja = visza-1;
		}while(nap[visza] != 1);
		
		
		for(int i = 0; i < nb.size(); i++) {
			String [] st = nb.get(i).getSDatum().split("/");
			if(st[0].equals(""+NS.getEv())) {
				if(st[1].equals(""+NS.getHonap())) {
					for(int j = 0; j < ho_utolsoNapja; j++) {
						if(nap[j] == Integer.parseInt(st[2])) {
							cimek[j] = nb.get(i).getCim();
							uzlisz[j] = i;
						}
					}
				}
			}
		}
		
	}
	
	public static void honapvalta(int irany, int[] nap, NaptarStruktura NS, Color[] szin, String[] cimek, ArrayList<Naptar_bejegyzes> nb, LocalDate dateTime) {
		if(irany == 1) {
			int nextWeekNumber = 37;
			NS.setHonap(NS.getHonap()+1);
			if(NS.getHonap() == 13) {
				NS.setEv(NS.getEv()+1);
				NS.setHonap(1);
			}
			int visza = nap.length;
			do {
				visza--;
				if(nap[visza] == 1) {
					nextWeekNumber = visza;
				}
			}while(nap[visza] != 1);
			
			if(nextWeekNumber == 30 || nextWeekNumber == 37) {
				NS.setMeilykNap(2);
			}else if(nextWeekNumber == 31 || nextWeekNumber == 38) {
				NS.setMeilykNap(3);
			}else if(nextWeekNumber == 32 || nextWeekNumber == 39) {
				NS.setMeilykNap(4);
			}else if(nextWeekNumber == 33 || nextWeekNumber == 40) {
				NS.setMeilykNap(5);
			}else if(nextWeekNumber == 34 || nextWeekNumber == 41) {
				NS.setMeilykNap(6);
			}else if(nextWeekNumber == 35) {
				NS.setMeilykNap(0);
			}else if(nextWeekNumber == 36) {
				NS.setMeilykNap(1);
			}
		}else if(irany == -1) {
			NS.setMeilykNap(hoElsoNapja(nap,  NS));
			NS.setHonap(NS.getHonap()-1);
			if(NS.getHonap() == 0) {
				NS.setEv(NS.getEv()-1);
				NS.setHonap(12);
			}
		}
		
		napokfeltoltese(nap, NS);
		for(int i = 0; i < szin.length; i++) {
			szin[i] = Color.BLACK;
			cimek[i] = "-";
		}
		nemHonapSzine(nap, szin, NS);
		if(NS.getEv() == dateTime.getYear() && NS.getHonap() == dateTime.getMonthValue()) {
			aktualis_nap_szine(nap, szin, dateTime, NS);
		}
		cimekfeltoltese(nb, nap, cimek, nap, NS);
	}
	
public static int hoElsoNapja(int[] n, NaptarStruktura NS) {
		int ertekR = 0;
		int mainap = 0;
		int szokoev = NS.getEv() % 4;
		String mainap_neve = "";
		
		if(NS.getMeilykNap() != 0) {
			mainap = n[NS.getMeilykNap()-1];
		}else {
			if(NS.getHonap() == 1 || NS.getHonap() == 2 || NS.getHonap() == 4 || NS.getHonap() == 6 || NS.getHonap() == 8 || NS.getHonap() == 9 || NS.getHonap() == 11) {
				mainap = 31;
			}else if(NS.getHonap() == 5 || NS.getHonap() == 7 || NS.getHonap() == 10 || NS.getHonap() == 12) {
				mainap = 30;
			}else if(NS.getHonap() == 3) {
				if(szokoev == 0) {
					mainap = 29;
				}else {
					mainap = 28;
				}
			}
		}
		
		if(NS.getMeilykNap() == 0) {
			mainap_neve = "SUNDAY";
		}else if(NS.getMeilykNap() == 1) {
			mainap_neve = "MONDAY";
		}else if(NS.getMeilykNap() == 2) {
			mainap_neve = "TUESDAY";
		}else if(NS.getMeilykNap() == 3) {
			mainap_neve = "WEDNESDAY";
		}else if(NS.getMeilykNap() == 4) {
			mainap_neve = "THURSDAY";
		}else if(NS.getMeilykNap() == 5) {
			mainap_neve = "FRIDAY";
		}else if(NS.getMeilykNap() == 6) {
			mainap_neve = "SATURDAY";
		}
		
		int hanyadikhet = mainap / 7;
		int kivonando = hanyadikhet * 7;
		int elsohet_napja = mainap - kivonando;
		
		if(elsohet_napja == 1) {
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 6;
			}
		}else if(elsohet_napja == 2){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 5;
			}
		}else if(elsohet_napja == 3){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 4;
			}
		}else if(elsohet_napja == 4){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 3;
			}
		}else if(elsohet_napja == 5){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 2;
			}
		}else if(elsohet_napja == 6){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 0;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 1;
			}
		}else if(elsohet_napja == 0){
			if(mainap_neve.equals("MONDAY")) {
				ertekR = 1;
			}
			else if(mainap_neve.equals("TUESDAY")) {
				ertekR = 2;
			}
			else if(mainap_neve.equals("WEDNESDAY")) {
				ertekR = 3;
			}
			else if(mainap_neve.equals("THURSDAY")) {
				ertekR = 4;
			}
			else if(mainap_neve.equals("FRIDAY")) {
				ertekR = 5;
			}
			else if(mainap_neve.equals("SATURDAY")) {
				ertekR = 6;
			}
			else if(mainap_neve.equals("SUNDAY")) {
				ertekR = 0;
			}
		}
		
		return ertekR;
	}
	
	
}
